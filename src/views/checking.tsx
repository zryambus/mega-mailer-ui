import * as React from 'react';
import { Switch, Title } from '@mantine/core';
import { getCheckingMutation, getCheckingQuery } from '~src/queries/account';

export const Checking = () => {
  const checking = getCheckingQuery();
  const mutation = getCheckingMutation();
  const onChange = () => {
    mutation.mutate(!checking.data);
  }
  return (
    <>
      <Switch
        label={checking.data ? 'Enabled' : 'Disabled'}
        checked={checking.data}
        onChange={onChange}
        size={'xl'}
        onLabel={'ON'}
        offLabel={'OFF'}
      />
    </>
  );
}
