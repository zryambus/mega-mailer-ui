import * as React from 'react';
import { MegaMailerApi } from 'mega-mailer-api';
import { ApiRequestor, Requestor } from 'requestor';

const requestor: ApiRequestor<MegaMailerApi> = new Requestor();

const RequestorContext = React.createContext(requestor);

const ProvideRequestor: React.FC = ({ children }) => (
  <RequestorContext.Provider value={requestor}>
    {children}
  </RequestorContext.Provider>
);

const useRequestor = () => {
  return React.useContext(RequestorContext);
}

export { ProvideRequestor, useRequestor }
