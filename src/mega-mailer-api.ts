export interface MegaMailerApi {
  '/auth': {
    post: {
      params: undefined;
      postData: { init_data: string };
      response: undefined;
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
    post: {
      params: undefined,
      postData: string[],
      response: undefined
    }
  },
  '/api/important_tags': {
    get: {
      params: undefined,
      response: string[]
    },
    post: {
      params: undefined,
      postData: string[],
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
