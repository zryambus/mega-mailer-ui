import * as React from 'react';
import * as cl from '~/src/app.module.scss';
import { Textarea, Button, Box } from '@mantine/core';
import { getImportantEmailsQuery, getImportantEmailsMutation } from '~src/queries/importance-settings';

export const ImportantEmails = () => {
  const emailsQuery = getImportantEmailsQuery();
  const emailsMutation = getImportantEmailsMutation();

  const [emails, setEmails] = React.useState<string[]>([]);
  const [emailsTextValue, setEmailsTextValue] = React.useState('');

  React.useEffect(() => {
    setEmails(emailsQuery.data ?? []);
  }, [emailsQuery.data]);

  const onChange: React.ChangeEventHandler<HTMLTextAreaElement> = e => {
    const nextTags = e.target.value.split('\n').flatMap(tag => tag.trim() ? tag.trim() : []);
    setEmailsTextValue(e.target.value);
    setEmails(nextTags);
  };

  const onClick = () => {
    emailsMutation.mutate(emails);
  };

  return (
    <Box className={cl.childSpacingV}>
      <Textarea
        placeholder={'crash@megadotcom\nhr@google.com'}
        value={emailsTextValue}
        onChange={onChange}
      />
      <Button onClick={onClick}>Submit</Button>
    </Box>
  )
}
