import * as React from 'react';
import { AppBar, Toolbar, Typography, Button, Avatar } from '@material-ui/core';
import {Link, useHistory, useLocation} from 'react-router-dom';
import * as cl from 'app.scss';
import {useContext} from 'react';
import {Auth} from './context/auth';

const Header: React.FC = () => {
  const auth = useContext(Auth);
  const history = useHistory();
  const location = useLocation();

  const isLoginView = location.pathname === '/login';

  const Title = () => <span className={cl.noLinkDecoration}>Mega mailer</span>;
  const logout = async () => {
    await auth.signOut();
    history.replace('/');
  }

  return (
    <AppBar style={{ height: 50 }}>
      <Toolbar variant={'dense'}>
        <Typography variant={'h4'} className={cl.flexgrow}>
          {!isLoginView
            ? (
              <Link to={'/'} className={cl.noLinkDecoration}>
                <Title />
              </Link>
            )
            : <Title />
          }
        </Typography>
        {!isLoginView && <>
          <Link to={'/settings'}><Button>Notification settings</Button></Link>
          <Link to={'/account'}><Button>Account settings</Button></Link>
        </>}
        {!isLoginView && <>
          <Avatar variant={'rounded'} src={auth?.user?.photo}/>
          <Button onClick={logout}>Logout</Button>
        </>}
      </Toolbar>
    </AppBar>
  );
}

export { Header }
