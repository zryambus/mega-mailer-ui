import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as cl from './_base.scss';

import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles'
import 'typeface-roboto';

import { RootView } from 'views/root-view';
import { Header } from 'header';
import { theme } from 'theme-provider';
import { Auth, ProvideAuth } from './context/auth';
import { LoginView } from './views/login-view';
import { AccountView } from './views/account-view';
import { ProvideRequestor } from './context/requestor';
import { NotificationSettingsView } from './views/notification-settings-view';

Promise.config({
  cancellation: true
});

const NoMatch = () => (
  <div>
    No Match
  </div>
);

const PrivateRoute: React.FC<Route['props']> = ({ children, ...rest }) => {
  const auth = React.useContext(Auth);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location.pathname }
            }}
          />
        )
      }
    />
  )
}

const App: React.FC = () => {
  return (
    <ProvideAuth>
      <ProvideRequestor>
        <Router>
          <ThemeProvider theme={theme}>
            <div className={cl.app}>
              <Header />
              <div className={cl.viewContainer}>
                <Switch>
                  <Route path={'/login'}>
                    <LoginView/>
                  </Route>
                  <PrivateRoute path={'/settings'}>
                    <NotificationSettingsView />
                  </PrivateRoute>
                  <PrivateRoute path={'/account'}>
                    <AccountView />
                  </PrivateRoute>
                  <PrivateRoute path={'/'}>
                    <RootView />
                  </PrivateRoute>
                  <Route component={NoMatch} />
                </Switch>
              </div>
            </div>
          </ThemeProvider>
        </Router>
      </ProvideRequestor>
    </ProvideAuth>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
