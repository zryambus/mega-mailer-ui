import * as React from 'react';
import * as cl from '_base.scss';
import cn from 'classnames';

import {useState, useContext} from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Button, Snackbar, TextField } from '@material-ui/core';
import TelegramIcon from '@material-ui/icons/Telegram';
import ExitToApp from '@material-ui/icons/ExitToApp';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import { Auth } from 'context/auth';
import HourglassEmpty from '@material-ui/icons/HourglassEmpty'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { AxiosError } from 'axios';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const LoginView: React.FC = () => {
  const [username, setUsername] = useState('');
  const [code, setCode] = useState('');
  const history = useHistory();
  const auth = useContext(Auth);
  const [user, setUser] = useState(auth.user);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [showSnack, setShowSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState<React.ReactNode>('');

  const requestCode = async () => {
    try {
      await auth.requestCode(username);
      setSnackMessage(
        <Alert severity={'success'} onClose={() => setShowSnack(false)}>
          Login code has been sent
        </Alert>
      );
    } catch (e) {
      setSnackMessage(
        <Alert severity={'error'} onClose={() => setShowSnack(false)}>
          {e.response.data.error}
        </Alert>
      );
    }

    setShowSnack(true);
  };

  const login = async () => {
    try {
      await auth.signIn(username, code);
      history.replace('/');
    } catch (e) {
      setSnackMessage(
        <Alert severity={'error'} onClose={() => setShowSnack(false)}>
          {e.response.data.error}
        </Alert>
      );
      setShowSnack(true);
    }
  };

  const register = async () => {
    try {
      const {code} = await auth.register(username);
      setSnackMessage(
        <Alert severity={'success'} onClose={() => setShowSnack(false)}>
          To register send `/attach {code}` to <a href={'https://t.me/mega_mail_bot'} target={'_blank'}>@mega_mail_bot</a>
        </Alert>
      );
    } catch (e) {
      setSnackMessage(
        <Alert severity={'error'} onClose={() => setShowSnack(false)}>
          {e.response.data.error}
        </Alert>
      );
    }
    setShowSnack(true);
  };

  React.useEffect(() => {
    if (loading && !user) {
      document.title = 'Login';

      const fetchUser = (async () => {
        const user = await auth.getMe();
        setUser(user);
        setLoading(false);
      })();

      return () => fetchUser.cancel();
    }
  }, [user]);

  React.useEffect(() => {
    if (user)
      history.replace(location.state?.from || '/');
  });


  return loading
    ? (
      <div className={cn(cl.fullSize, cl.flexbox)}>
        <div className={cn(cl.marginAuto, cl.flexcol, cl.alignItemsCenter)}>
          <HourglassEmpty fontSize={'large'}  />
          <p>Loading</p>
        </div>
      </div>
    )
    : (
    <div className={cn(cl.fullSize, cl.flexbox)}>
      <div className={cn(cl.marginAuto, cl.flexcol, cl.childSpacingV)}>
        <TextField
          value={username}
          onChange={e => setUsername(e.currentTarget.value)}
          label={'Login'}
        />
        <TextField
          value={code}
          onChange={e => setCode(e.currentTarget.value)}
          type={'password'}
          label={'Code'}
        />
        <Button
          variant={'outlined'}
          color={'primary'}
          size={'large'}
          startIcon={<TelegramIcon />}
          onClick={requestCode}
        >
          Request code
        </Button>
        <Button
          variant={'outlined'}
          color={'primary'}
          size={'large'}
          startIcon={<ExitToApp />}
          onClick={login}
        >
          Login
        </Button>
        <Button
          variant={'outlined'}
          color={'primary'}
          size={'large'}
          startIcon={<HowToRegIcon />}
          onClick={register}
        >
          Register
        </Button>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={showSnack}
        onClose={() => setShowSnack(false)}
        message={snackMessage}
      />
    </div>
  );
}

export { LoginView }
