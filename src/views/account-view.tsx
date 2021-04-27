import * as React from 'react';
import cn from 'classnames';
import * as cl from '_base.scss';
import { Button, Switch, TextField, Typography } from '@material-ui/core';
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

  return(
    <div className={cn(cl.flexcol, cl.flexgrow, cl.justifyContentCenter)}>
      <div className={cn(cl.flexrow, cl.childSpacing, cl.flexWrap, cl.justifyContentCenter)}>
        <div className={cn(cl.flexcol, cl.childSpacingV, cl.wideControlWidth)}>
          <Typography variant={'h5'} gutterBottom>
            Mail account
          </Typography>
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
        <div className={cn(cl.flexcol, cl.childSpacingV, cl.wideControlWidth)}>
          <Typography variant={'h5'} gutterBottom>
            Mail checker
          </Typography>
          <Typography gutterBottom>
            Periodic mail checking
          </Typography>
          <div className={cn(cl.flexrow, cl.alignItemsBaseline, cl.justifyContentSpaceBetween)}>
            <Typography gutterBottom>
              {checking ? 'Enabled' : 'Disabled'}
            </Typography>
            <Switch
              checked={checking}
              onChange={toggleChecking}
              color={'primary'}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export { AccountView };
