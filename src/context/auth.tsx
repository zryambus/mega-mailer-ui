import * as React from 'react';
import { ApiRequestor, Requestor } from '../requestor';
import { MegaMailerApi, User } from '../mega-mailer-api';
import { useState } from 'react';

interface IAuth {
  requestor: ApiRequestor<MegaMailerApi>;
  user?: User | undefined;
}

const auth: IAuth = {
  requestor: new Requestor(),
  user: undefined
};

interface IAuthProvider {
  getMe: () => Promise<User | undefined>;
  register: (username: string) => Promise<{ code?: string }>;
  requestCode: (username: string) => Promise<void>;
  signIn: (username: string, code: string) => Promise<void>;
  signOut: () => Promise<void>;
}

function useProvideAuth(): IAuthProvider & { user?: User } {
  const [user, setUser] = useState(undefined);

  const getMe = async () => {
    if (user)
      return user;

    try {
      const user = await auth.requestor.getJson('/whoami', undefined);
      setUser(user);
      return user;
    } catch (e) {
      // if (e?.response?.status === 401) {
      //   console.log('Need authorization');
      // }
      return undefined;
    }
  };

  const register = async (username: string) => {
    return auth.requestor.postJson('/attach_code', undefined, { username })
  }

  const requestCode = async (username: string) => {
    await auth.requestor.postJson('/login_code', undefined, { username })
  }

  const signIn = async (username: string, code: string) => {
    await auth.requestor.postJson('/login', undefined, { username, code });
    await getMe();
  };

  const signOut = async () => {
    await auth.requestor.getJson('/logout', undefined);
    setUser(undefined);
  };

  return { getMe, register, requestCode, signIn, signOut, user };
}


const Auth = React.createContext<IAuthProvider & { user?: User }>(undefined);

const ProvideAuth: React.FC = ({children}) => {
  const auth = useProvideAuth();
  return (
    <Auth.Provider value={auth}>
      {children}
    </Auth.Provider>
  )
}

export { Auth, useProvideAuth, ProvideAuth };
