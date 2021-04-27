import * as React from 'react';
import { Redirect } from 'react-router-dom';

const RootView: React.FC = () => {

  React.useEffect(() => {
    document.title = 'Mega mailer';
  });

  return (
    <div>
      <Redirect to={'/status'} />
    </div>
  );
};

export { RootView }
