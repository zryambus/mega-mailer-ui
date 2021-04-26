import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as cl from './_base.scss';

import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles'
import 'typeface-roboto';

import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { RootView } from 'views/root-view';
import { Header } from 'header';
import { theme } from 'theme-provider';
import { AccountView } from 'views/account-view';
import { NotificationSettingsView } from 'views/notification-settings-view';
import { getUserQuery } from 'queries/auth';
import { LoginView } from './views/login-view';

const NoMatch = () => (
  <div>
    No Match
  </div>
);

const PrivateRoute: React.FC<{path: string}> = ({ children, path }) => {
  const userQuery = getUserQuery();

  return (
    <Route render={({ location }) => userQuery.data != null
      ? (
        children
      )
      : (
        <Redirect to={{
          pathname: '/login',
          state: { from: location.pathname }
        }} />
      )} />
  );
}

const App: React.FC = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
      }
    }
  });
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ThemeProvider theme={theme}>
          <div className={cl.app}>
            <Header />
            <div className={cl.viewContainer}>
              <Switch>
                <PrivateRoute path={'/settings'}>
                  <NotificationSettingsView />
                </PrivateRoute>
                <PrivateRoute path={'/account'}>
                  <AccountView />
                </PrivateRoute>
                <Route path={'/login'}>
                  <LoginView />
                </Route>
                <Route path={'/'}>
                  <RootView />
                </Route>
                <Route component={NoMatch} />
              </Switch>
            </div>
          </div>
        </ThemeProvider>
      </Router>
      <ReactQueryDevtools initialIsOpen={true}/>
    </QueryClientProvider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
