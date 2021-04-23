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
import { AuthorizedOnly } from 'context/auth';
import { AccountView } from 'views/account-view';
import { NotificationSettingsView } from 'views/notification-settings-view';


const NoMatch = () => (
  <div>
    No Match
  </div>
);

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
            <AuthorizedOnly>
              <div className={cl.viewContainer}>
                <Switch>
                  <Route path={'/settings'}>
                    <NotificationSettingsView />
                  </Route>
                  <Route path={'/account'}>
                    <AccountView />
                  </Route>
                  <Route path={'/'}>
                    <RootView />
                  </Route>
                  <Route component={NoMatch} />
                </Switch>
              </div>
            </AuthorizedOnly>
          </div>
        </ThemeProvider>
      </Router>
      <ReactQueryDevtools initialIsOpen={true}/>
    </QueryClientProvider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
