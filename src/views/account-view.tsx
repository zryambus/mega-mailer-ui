import * as React from 'react';
import { useRequestor } from 'context/requestor';
import cn from 'classnames';
import * as cl from '../_base.scss';
import { Button, TextField } from '@material-ui/core';
import CheckCircle from '@material-ui/icons/CheckCircle';
import HighlightOff from '@material-ui/icons/HighlightOff';

const AccountView: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [checking, setChecking] = React.useState(false)
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

  React.useEffect(() => {
    const f = (async () => {
      const checking = await requestor.getJson('/api/checking', undefined);
      setChecking(checking);
    })();
    return () => f.cancel()
  }, []);

  const update = async () => {
    await requestor.postJson('/api/account', undefined, { email, password });
  };

  const toggle_checking = async () => {
    await requestor.postJson('/api/checking', undefined, { state: !checking });
    setChecking(!checking);
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
      <Button
        variant={'outlined'}
        color={checking ? 'secondary' : 'primary'}
        size={'large'}
        startIcon={checking ? <HighlightOff /> : <CheckCircle />}
        onClick={toggle_checking}
      >
        {checking ? 'Disable checking' : 'Enable checking'}
      </Button>
    </div>
  </div>)
}

export { AccountView };
