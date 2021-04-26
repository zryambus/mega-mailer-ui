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

export { ImportantAddresses };

const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function validateEmail(email: string) {
  return re.test(String(email).toLowerCase());
}

const ImportantAddresses: React.FC = () => {
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
    <div className={cn(cl.flexcol, cl.childSpacingV, cl.wideControlWidth)}>
      <Typography variant={'h5'} gutterBottom>
        Important addresses
      </Typography>
      <Typography gutterBottom>
        Receive notifications immediately from these addresses
      </Typography>
      <div className={cn(cl.flexbox, cl.flexgrow, cl.flexBasis0, cl.overflowY, cl.minHeight100Px)}>
        <List className={cn(cl.flexcol, cl.flexgrow)}>
          {importantEmailsQuery.data.map((email, index) => (
            <React.Fragment key={index}>
              <ListItem>
                <ListItemText primary={email} />
                <ListItemSecondaryAction>
                  <IconButton edge={'end'} aria-label={'Remove'} onClick={() => deleteEmail(email)}>
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              {(importantEmailsQuery.data.length != index + 1) && <Divider variant={'fullWidth'} component={'li'} />}
            </React.Fragment>
          ))}
        </List>
      </div>
      <TextField
        value={email}
        onChange={e => setEmail(e.currentTarget.value)}
        placeholder={'Important email'}
        type={'email'}
        variant={'outlined'}
        error={!!(email.length && !inputIsValid)}
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
  )
};
