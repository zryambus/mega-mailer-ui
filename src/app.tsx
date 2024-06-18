import * as React from 'react';
import { createRoot } from 'react-dom/client';
import '@mantine/core/styles.css';

import {
  MantineProvider,
  Container,
  Title,
  Loader,
  Alert,
  Accordion,
  Space,
} from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { create } from 'zustand';
import { MailAccount } from '~/src/views/mail-account';
import { WorkingHours } from '~/src/views/working-hours';
import { ImportantTags } from '~/src/views/important-tags';

import * as cl from './app.module.scss';
import { requestor } from './context/requestor';
import { ImportantEmails } from './views/important-emails';
import { Checking } from './views/checking';
import { Heartbeat } from './views/heartbeat';

type Store = {
  user: WebAppUser | undefined;
};

const useMyStore = create<Store>()((set, get) => ({
  user: undefined,
}));

const View: React.FC = () => {
  const [authorized, loading] = useAuth();

  if (loading)
    return <Loader color={'blue'} size={'xl'} type={'bars'} />

  if (!authorized)
    return <Alert variant={'default'} color={'blue'} title={'Not authorized'} icon={<IconAlertCircle />}>
      Something went wrong
    </Alert>

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
        <Accordion.Item value={'Improtant tags'}>
          <Accordion.Control>Important tags</Accordion.Control>
          <Accordion.Panel>
            <ImportantTags />
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value={'Improtant emails'}>
          <Accordion.Control>Important emails</Accordion.Control>
          <Accordion.Panel>
            <ImportantEmails />
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value={'Checking'}>
          <Accordion.Control>Checking</Accordion.Control>
          <Accordion.Panel>
            <Checking />
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value={'Heartbeat'}>
          <Accordion.Control>Heartbeat</Accordion.Control>
          <Accordion.Panel>
            <Heartbeat />
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
      <Space h={'md'} />
      <Title ta={'center'} size={'sm'}><UserName /></Title>
    </Container>
  )
}

const UserName = () => {
  const { user } = window.Telegram.WebApp.initDataUnsafe;
  if (!user)
    return null;
  const { first_name, last_name, username } = user;
  let name = first_name;

  if (last_name)
    name += ' ' + last_name;
  else if (username)
    name += ' @' + username;

  return name;
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

function useAuth() {
  const [loading, setLoading] = React.useState(true);
  const user = useMyStore(s => s.user);

  React.useEffect(() => {
    (async () => {
      try {
        await requestor.postJson('/auth', undefined, { init_data: window.Telegram.WebApp.initData });
        useMyStore.setState({ user: window.Telegram.WebApp.initDataUnsafe.user });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const authorized = !loading && user;

  return [authorized, loading];
}
