import * as React from 'react';
import { useRequestor } from 'context/requestor';
import cn from 'classnames';
import * as cl from '../_base.scss';
import { Button, TextField } from '@material-ui/core';
import CheckCircle from '@material-ui/icons/CheckCircle';

const AccountView: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const requestor = useRequestor();

  React.useEffect(() => {
    document.title = 'Account';

    const f = (async () => {
      const res = await requestor.getJson('/api/account', undefined)
      if (!res) return;
      const { email, password } = res;
      setEmail(email);
      setPassword(password);
    })();

    return () => {
      f.cancel();
    }
  }, []);

  const update = async () => {
    await requestor.postJson('/api/account', undefined, { email, password });
  };

  return(<div className={cn(cl.fullSize, cl.flexbox)}>
    <div className={cn(cl.marginAuto, cl.flexcol, cl.childSpacingV)}>
      <TextField
        value={email}
        onChange={e => setEmail(e.currentTarget.value)}
        label={'Email'}
        inputMode={'email'}
      />
      <TextField
        value={password}
        onChange={e => setPassword(e.currentTarget.value)}
        type={'password'}
        label={'Password'}
      />
      <Button
        variant={'outlined'}
        color={'primary'}
        size={'large'}
        startIcon={<CheckCircle />}
        onClick={update}
      >
        Update settings
      </Button>
    </div>
  </div>)
}

export { AccountView };
