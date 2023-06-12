import * as React from 'react';
import { createRoot } from 'react-dom/client';
import {
  MantineProvider, Button, Container, Code, Collapse, Title, Loader, Alert, NavLink,
  Navbar, Header, AppShell, Avatar, Burger, Text
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import axios from 'axios';
import { create } from 'zustand';
import { IconAlertCircle, IconArrowBack, IconArrowLeft, IconBook, IconBug, IconFilePlus } from '@tabler/icons-react';
import {
  createMemoryRouter,
  RouterProvider,
  Link,
  useNavigate,
  Outlet
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useStore } from 'zustand';


import { RootView } from 'views/root-view';
import { Header as MyHeader } from 'header';
import { theme } from 'theme-provider';
import { AccountView } from 'views/account-view';
import { NotificationSettingsView } from 'views/notification-settings-view';
import { getUserQuery } from 'queries/auth';
import { LoginView } from './views/login-view';
import { StatusView } from './views/status-view';

const NoMatch = () => (
  <div>
    No Match
  </div>
);

const View: React.FC = () => {
  const user = useStore(s => s.user);
  const navigate = useNavigate();
  const [showNavbar, { toggle: toggleNavbar, close: closeNavBar }] = useDisclosure(false);

  if (!user)
    return null;

  return (
    <AppShell
      padding={'sm'}
      header={<Header height={60} p={'sm'} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Burger opened={showNavbar} onClick={toggleNavbar} />
        <Title>MegaMailer</Title>
        <Avatar src={user.photo_url} alt={user.first_name} />
      </Header>}
      navbar={showNavbar ? (
        <Navbar>
          <Navbar.Section>
            <NavLink
              label={'Manage profiles'}
              onClick={() => { navigate('/manage'); closeNavBar(); }}
              styles={{ label: { fontSize: 18 } }}
              icon={<IconBook />}					
            />
            <NavLink
              label={'Add profile'}
              onClick={() => { navigate('/add'); closeNavBar(); }}
              styles={{ label: { fontSize: 18 } }}
              icon={<IconFilePlus />}
            />
          </Navbar.Section>
        </Navbar>
      ) : undefined}
    >
      <Outlet />
    </AppShell>
  )
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
  
  const router = createMemoryRouter([
    {
      path: '/',
      element: <View />,
      children: [
        {
          path: 'status',
          element: <StatusView />
        },
        {
          path: 'settings',
          element: <NotificationSettingsView />
        },
        {
          path: 'account',
          element: <AccountView />
        }
      ]
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      {/* <Router>
        <ThemeProvider theme={theme}>
          <div className={cl.app}>
            <MyHeader />
            <div className={cl.viewContainer}>
              <Switch>
                <Route path={'/status'}>
                  <StatusView />
                </Route>
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
      </Router> */}
      <MantineProvider withGlobalStyles withNormalizeCSS theme={{
        colorScheme: window.Telegram.WebApp.colorScheme,
      }}>
        <Container
          style={{ display: 'flex', flexDirection: 'column' }}
          p={'md'}
          h={'100%'}
        >
          {/* {loading && <Loader size={'xl'} />}
          {authFailed && (
            <Alert icon={<IconAlertCircle size="1rem" />} title="Error" color="red" variant="outline" style={{ overflow: 'auto' }}>
              Authentication failed. Something went wrong
              <pre>{JSON.stringify(window.Telegram.WebApp.initDataUnsafe)}</pre>
            </Alert>
          )} */}
          <RouterProvider router={router} />
        </Container>
      </MantineProvider>
    </QueryClientProvider>
  );
}

const root = createRoot(document.querySelector('#root')!);
root.render(<App />);