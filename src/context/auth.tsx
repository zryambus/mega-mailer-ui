import * as React from 'react';
import { LoginView } from 'views/login-view';
import { getUserQuery } from 'queries/auth';

const AuthorizedOnly: React.FC = ({children}) => {
  const { data: user, isLoading } = getUserQuery()

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (user != null) {
    return <>{children}</>;
  } else {
    return <LoginView />
  }
};

export { AuthorizedOnly };
