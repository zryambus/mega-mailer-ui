import * as React from 'react';
import { createRoot } from 'react-dom/client';
import '@mantine/core/esm/index.css';

import {
  MantineProvider, Button, Container, Code, Collapse, Title, Loader, Alert, NavLink,
  AppShell, Avatar, Burger, Text, Accordion, PasswordInput, TextInput
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import axios from 'axios';
import { IconAlertCircle, IconArrowBack, IconArrowLeft, IconBook, IconBug, IconFilePlus } from '@tabler/icons-react';
import {
  createMemoryRouter,
  RouterProvider,
  Link,
  useNavigate,
  Outlet
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useStore, create } from 'zustand';
import { MailAccount } from '~/src/views/mail-account';
import { WorkingHours } from '~/src/views/working-hours';
import { ImporttantTags } from '~/src/views/important-tags';

import * as cl from './app.module.scss';

type Store = {
  user: WebAppUser | undefined;
};

const useMyStore = create<Store>()((set, get) => ({
  user: undefined,
}));

const NoMatch = () => (
  <div>
    No Match
  </div>
);

const View: React.FC = () => {
  const user = useMyStore(s => s.user);
  // const navigate = useNavigate();
  const [showNavbar, { toggle: toggleNavbar, close: closeNavBar }] = useDisclosure(false);

  // if (!user)
  //   return null;

  return (
    <Container size={'lg'}>
      <Title ta={'center'} className={cl.title}>Mega mailer</Title>

      <Accordion variant={'separated'}>
        <Accordion.Item value={'account'}>
          <Accordion.Control>Mail account</Accordion.Control>
          <Accordion.Panel>
            <MailAccount />
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value={'hours'}>
          <Accordion.Control>Working hours</Accordion.Control>
          <Accordion.Panel>
            <WorkingHours />
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value={'Improtant tangs'}>
          <Accordion.Control>Important tags</Accordion.Control>
          <Accordion.Panel>
            <ImporttantTags />
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Container>
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



  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider defaultColorScheme={window.Telegram.WebApp.colorScheme ?? 'dark'}>
        <View />
      </MantineProvider>
    </QueryClientProvider>
  );
}

const root = createRoot(document.querySelector('#root')!);
root.render(<App />);
