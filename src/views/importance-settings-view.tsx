import * as React from 'react';
import * as cl from 'app.scss';
import cn from 'classnames';
import {
  getImportantEmailsAddMutation,
  getImportantEmailsQuery,
  getImportantEmailsRemoveMutation
} from 'queries/importance-settings';
import {
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Button,
  TextField, Typography, Divider
} from '@material-ui/core';
import { Add, Delete } from '@material-ui/icons';

export { ImportanceSettingsView };

const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function validateEmail(email: string) {
  return re.test(String(email).toLowerCase());
}

const ImportanceSettingsView: React.FC = () => {
  const importantEmailsQuery = getImportantEmailsQuery();
  const importantEmailsAddMutation = getImportantEmailsAddMutation();
  const importantEmailsRemoveMutation = getImportantEmailsRemoveMutation();

  const [email, setEmail] = React.useState('');

  const add = async () => {
    await importantEmailsAddMutation.mutate(email);
    setEmail('');
  }

  const deleteEmail = async (email: string) => {
    await importantEmailsRemoveMutation.mutate(email);
  }

  if (importantEmailsQuery.isLoading) {
    return <div>Is loading</div>;
  }

  const inputIsValid = validateEmail(email);

  return (
    <div className={cn(cl.fullSize, cl.flexbox)}>
      <div className={cn(cl.marginAuto, cl.flexcol, cl.childSpacingV, cl.wideControlWidth)}>
        <Typography variant={'h5'} gutterBottom>
          Important addresses
        </Typography>
        <Typography gutterBottom>
          Receive notifications immediately from these addresses
        </Typography>
        <List>
          {importantEmailsQuery.data.map((email, index) => (
            <>
              <ListItem key={index}>
                <ListItemText primary={email} />
                <ListItemSecondaryAction>
                  <IconButton edge={'end'} aria-label={'Remove'} onClick={() => deleteEmail(email)}>
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              {(importantEmailsQuery.data.length != index + 1) && <Divider variant={'fullWidth'} component={'li'} />}
            </>
          ))}
        </List>
        <TextField
          value={email}
          onChange={e => setEmail(e.currentTarget.value)}
          placeholder={'Important email'}
          type={'email'}
          variant={'outlined'}
          error={email.length && !inputIsValid}
        />
        <Button
          variant={'outlined'}
          color={'primary'}
          size={'large'}
          startIcon={<Add />}
          onClick={add}
          disabled={!email.length || !inputIsValid}
        >
          Add
        </Button>
      </div>
    </div>
  )
};
