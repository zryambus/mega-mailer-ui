import * as React from 'react';
import * as cl from '_base.scss';
import cn from 'classnames';

import {useState, useContext} from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {Button, TextField} from '@material-ui/core';
import TelegramIcon from '@material-ui/icons/Telegram';
import ExitToApp from '@material-ui/icons/ExitToApp';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import { Auth } from 'context/auth';
import HourglassEmpty from '@material-ui/icons/HourglassEmpty'

const LoginView: React.FC = () => {
  const [username, setUsername] = useState('');
  const [code, setCode] = useState('');
  const history = useHistory();
  const auth = useContext(Auth);
  const [user, setUser] = useState(auth.user);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const requestCode = async () => {
    await auth.requestCode(username);
  };

  const login = async () => {
    await auth.signIn(username, code);
    history.replace('/');
  };

  const register = async () => {
    const {code} = await auth.register(username);
    console.log(code);
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
    </div>
  );
}

export { LoginView }
