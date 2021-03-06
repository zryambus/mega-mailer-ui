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
  '/api/checking': {
      get: {
        params: undefined,
        response: boolean,
      },
      post: {
        params: undefined,
        postData: {
          state: boolean,
        },
        response: undefined;
      }
  },
  '/api/working_hours': {
      get: {
        params: undefined,
        response: [number, number] | null
      },
      post: {
        params: undefined,
        postData: [number, number],
        response: undefined
      },
  },
  '/api/important_emails': {
    get: {
      params: undefined,
      response: string[]
    },
    patch: {
      params: { email: string },
      patchData: undefined,
      response: undefined
    },
    delete: {
      params: { email: string },
      response: undefined
    }
  },
  '/api/important_tags': {
    get: {
      params: undefined,
      response: string[]
    },
    patch: {
      params: { tag: string },
      patchData: undefined,
      response: undefined
    },
    delete: {
      params: { tag: string },
      response: undefined
    }
  },
  '/api/heartbeat': {
    get: {
      params: undefined,
      response: { TELEGRAM_BOT?: number, MAIL_CHECKER?: number }
    }
  }
}
