import * as React from 'react';
import { TextInput, PasswordInput, Button } from '@mantine/core';

export const MailAccount = () => {
  return (
    <>
      <TextInput label={'Email'} />
      <PasswordInput label={'Password'} />
      <Button>Submit</Button>
    </>
  )
}