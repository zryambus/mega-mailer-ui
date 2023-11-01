import * as React from 'react';
import { TextInput, PasswordInput, Button, Box } from '@mantine/core';
import * as cl from '~/src/app.module.scss';
import { getAccountMutation, getAccountQuery } from '~/src/queries/account';

export const MailAccount = () => {
  const accountQuery = getAccountQuery();
  const mutation = getAccountMutation();

  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  const onClick = () => {
    const email = emailRef.current?.value ?? '';
    const password = passwordRef.current?.value ?? '';
    mutation.mutate({ email, password });
  };

  return (
    <Box className={cl.childSpacingV}>
      <TextInput
        ref={emailRef}
        label={'Email'}
        defaultValue={accountQuery.data?.email}
        type={'email'}
      />
      <PasswordInput
        ref={passwordRef}
        label={'Password'}
        defaultValue={accountQuery.data?.password}
      />
      <Button onClick={onClick}>Submit</Button>
    </Box>
  );
}
