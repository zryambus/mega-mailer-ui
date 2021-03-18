export interface User {
  firstName: string;
  photo?: string;
}

export interface MegaMailerApi {
  '/whoami': {
    get: {
      params: undefined;
      response: User;
    }
  },
  '/login': {
    post: {
      params: undefined,
      postData: {
        username: string;
        code: string;
      },
      response: undefined
    }
  },
  '/login_code': {
    post: {
      params: undefined,
      postData: {
        username: string
      },
      response: undefined
    }
  },
  '/attach_code': {
    post: {
      params: undefined,
      postData: {
        username: string
      },
      response: {
        code: string
      }
    }
  },
  '/logout': {
    get: {
      params: undefined,
      response: undefined
    }
  },
  '/api/account': {
    get: {
      params: undefined,
      response: { email: string, password: string } | undefined
    },
    post: {
      params: undefined,
      postData: { email: string, password: string },
      response: undefined
    }
  },
}
