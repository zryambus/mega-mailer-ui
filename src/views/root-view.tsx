import * as React from 'react';

const RootView: React.FC = () => {

  React.useEffect(() => {
    document.title = 'Mega mailer';
  });

  return (
    <div>
      Root view
    </div>
  );
};

export { RootView }
