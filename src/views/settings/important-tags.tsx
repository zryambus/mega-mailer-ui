import * as React from 'react';
import * as cl from 'app.scss';
import cn from 'classnames';
import {
  getImportantTagsAddMutation,
  getImportantTagsQuery,
  getImportantTagsRemoveMutation
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

export { ImportantTags };


const ImportantTags: React.FC = () => {
  const importantTagsQuery = getImportantTagsQuery();
  const importantTagsAddMutation = getImportantTagsAddMutation();
  const importantTagsRemoveMutation = getImportantTagsRemoveMutation();
  const [tag, setTag] = React.useState('');

  const add = async () => {
    await importantTagsAddMutation.mutate(tag);
    setTag('');
  }

  const deleteTag = async (tag: string) => {
    await importantTagsRemoveMutation.mutate(tag);
  }

  if (importantTagsQuery.isLoading) {
    return <div>Is loading</div>;
  }

  return (
    <div className={cn(cl.flexcol, cl.childSpacingV, cl.wideControlWidth)}>
      <Typography variant={'h5'} gutterBottom>
        Important tags
      </Typography>
      <Typography gutterBottom>
        Receive notifications immediately if these tags appear in an email subject
      </Typography>
      <div className={cn(cl.flexbox, cl.flexgrow, cl.flexBasis0, cl.overflowY, cl.minHeight100Px)}>
        <List className={cn(cl.flexcol, cl.flexgrow)}>
          {importantTagsQuery.data.map((email, index) => (
            <React.Fragment key={index}>
              <ListItem>
                <ListItemText primary={email} />
                <ListItemSecondaryAction>
                  <IconButton edge={'end'} aria-label={'Remove'} onClick={() => deleteTag(email)}>
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              {(importantTagsQuery.data.length != index + 1) && <Divider variant={'fullWidth'} component={'li'} />}
            </React.Fragment>
          ))}
        </List>
      </div>
      <TextField
        value={tag}
        onChange={e => setTag(e.currentTarget.value)}
        placeholder={'Tag'}
        variant={'outlined'}
      />
      <Button
        variant={'outlined'}
        color={'primary'}
        size={'large'}
        startIcon={<Add />}
        onClick={add}
        disabled={!tag.length}
      >
        Add
      </Button>
    </div>
  )
};
