import * as React from 'react';
import cn from 'classnames';
import * as cl from '_base.scss';
import { Button, TextField } from '@material-ui/core';
import CheckCircle from '@material-ui/icons/CheckCircle';
import HighlightOff from '@material-ui/icons/HighlightOff';
import { getAccountMutation, getAccountQuery, getCheckingMutation, getCheckingQuery } from 'queries/account';

const AccountView: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [checking, setChecking] = React.useState(false)

  React.useEffect(() => {
    document.title = 'Account';
  }, []);

  const accountQuery = getAccountQuery();
  const accountMutation = getAccountMutation();

  const checkingQuery = getCheckingQuery();
  const checkingMutation = getCheckingMutation();

  React.useEffect(() => {
    const { data: account } = accountQuery;
    setEmail(account?.email || '');
    setPassword(account?.password || '')
  }, [accountQuery.data])

  React.useEffect(() => {
    const { data: checking } = checkingQuery;
    setChecking(!!checking);
  }, [checkingQuery.data])

  const update = () => {
    accountMutation.mutate({ email, password });
  };

  const toggleChecking = async () => {
    checkingMutation.mutate(!checking);
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
        onClick={toggleChecking}
      >
        {checking ? 'Disable checking' : 'Enable checking'}
      </Button>
    </div>
  </div>)
}

export { AccountView };
