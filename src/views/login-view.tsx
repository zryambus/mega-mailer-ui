import * as React from 'react';
import * as cl from '_base.scss';
import cn from 'classnames';

import { useState } from 'react';
import { Button, Snackbar, TextField } from '@material-ui/core';
import TelegramIcon from '@material-ui/icons/Telegram';
import ExitToApp from '@material-ui/icons/ExitToApp';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import HourglassEmpty from '@material-ui/icons/HourglassEmpty'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { requestor } from 'context/requestor';
import { getUserMutation, getUserQuery } from 'queries/auth';
import { Redirect } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const LoginView: React.FC = () => {
  const [username, setUsername] = useState('');
  const [code, setCode] = useState('');
  const [showSnack, setShowSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState<React.ReactNode>('');
  const location = useLocation();

  const userQuery = getUserQuery();
  const userMutation = getUserMutation();

  const requestCode = async () => {
    try {
      await requestor.postJson('/login_code', undefined, { username });
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
    userMutation.mutate({ username, code }, {
      onError: (e) => {
        setSnackMessage(
            <Alert severity={'error'} onClose={() => setShowSnack(false)}>
              {e.response.data.error}
            </Alert>
          );
        setShowSnack(true);
      }
    });
  };

  const register = async () => {
    try {
      const { code } = await requestor.postJson('/attach_code', undefined, { username })
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

  if (userQuery.data != null) {
    return <Redirect to={location.state?.from || '/'} />
  }

  return userQuery.isLoading
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
