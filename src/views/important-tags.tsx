import * as React from 'react';
import * as cl from '~/src/app.module.scss';
import { Textarea, Button, Box } from '@mantine/core';
import { getImportantTagsQuery, getImportantTagsMutation } from '~src/queries/importance-settings';

export const ImportantTags = () => {
  const tagsQuery = getImportantTagsQuery();
  const tagsMutation = getImportantTagsMutation();

  const [tags, setTags] = React.useState<string[]>([]);
  const [tagsTextValue, setTagsTextValue] = React.useState('');

  React.useEffect(() => {
    setTags(tagsQuery.data ?? []);
  }, [tagsQuery.data]);

  const onChange: React.ChangeEventHandler<HTMLTextAreaElement> = e => {
    const nextTags = e.target.value.split('\n').flatMap(tag => tag.trim() ? tag.trim() : []);
    setTagsTextValue(e.target.value);
    setTags(nextTags);
  };

  const onClick = () => {
    tagsMutation.mutate(tags);
  };

  return (
    <Box className={cl.childSpacingV}>
      <Textarea
        placeholder={'crash\nfailed'}
        value={tagsTextValue}
        onChange={onChange}
      />
      <Button onClick={onClick}>Submit</Button>
    </Box>
  )
}
