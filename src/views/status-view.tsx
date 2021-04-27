import * as React from 'react';
import * as cl from '_base.scss';
import cn from 'classnames';
import { getHeartbeatQuery } from 'queries/heartbeat';
import { List, ListItem, ListItemSecondaryAction, ListItemText, Typography } from '@material-ui/core';
import { Check, Close } from '@material-ui/icons';

const StatusView: React.FC = () => {
  const heartbeatQuery = getHeartbeatQuery();

  if (heartbeatQuery.isLoading) {
    return (<div>Loading</div>)
  }

  const { MAIL_CHECKER, TELEGRAM_BOT } = heartbeatQuery.data;
  const now = Date.now();

  const mailChecker = (now - (MAIL_CHECKER * 1000)) / 1000;
  const telegramBot = (now - (TELEGRAM_BOT * 1000)) / 1000;

  return (<div className={cn(cl.flexrow, cl.flexgrow, cl.justifyContentCenter)}>
    <div className={cn(cl.flexbox, cl.flexcol, cl.justifyContentCenter)}>
      <Typography variant={'h5'} gutterBottom>
        Service status
      </Typography>
      <List className={cl.wideControlWidth}>
        <ListItem>
          <ListItemText>Mail checker</ListItemText>
          <ListItemSecondaryAction>
            { mailChecker < 30 ? <Check titleAccess={'Online'} /> : <Close titleAccess={'Offline'} /> }
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemText>Telegram bot</ListItemText>
          <ListItemSecondaryAction>
            { telegramBot < 30 ? <Check titleAccess={'Online'} /> : <Close titleAccess={'Offline'} /> }
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </div>
  </div>);
}

export { StatusView };
