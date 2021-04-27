import * as React from 'react';
import * as cl from 'app.scss';
import { AppBar, Toolbar, Typography, Button, Avatar } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { getLogoutMutation, getUserQuery } from 'queries/auth';

const Header: React.FC = () => {
  const history = useHistory();
  const logoutMutation = getLogoutMutation();

  const Title = () => <span className={cl.noLinkDecoration}>Mega mailer</span>;
  const logout = async () => {
    logoutMutation.mutate();
    history.replace('/');
  }

  const { data: user } = getUserQuery()

  return (
    <AppBar style={{ height: 50 }}>
      <Toolbar variant={'dense'}>
        <Typography variant={'h4'} className={cl.flexgrow}>
          {user
            ? (
              <Link to={'/'} className={cl.noLinkDecoration}>
                <Title />
              </Link>
            )
            : <Title />
          }
        </Typography>
        <Link to={'/status'}><Button>Service status</Button></Link>
        {user && <>
          <Link to={'/settings'}><Button>Notification settings</Button></Link>
          <Link to={'/account'}><Button>Account settings</Button></Link>
        </>}
        {user && <>
          <Avatar variant={'rounded'} src={user?.photo}/>
          <Button onClick={logout}>Logout</Button>
        </>}
      </Toolbar>
    </AppBar>
  );
}

export { Header }
