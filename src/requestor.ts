interface GetParams {
  params: any;
  response: any;
}

interface PostParams {
  params: any;
  postData: any;
  response: any;
}

interface DeleteParams {
  params: any;
  response: any;
}

interface PatchParams {
  params: any;
  patchData: any;
  response: any;
}

type ApiBase<T extends string> = {
  [action in T]: { readonly get: Readonly<GetParams> } | { readonly post: Readonly<PostParams> } | { readonly delete: Readonly<DeleteParams>};
};

type TypePropertyNames<T, U> = { [K in keyof T]: NonNullable<T[K]> extends U ? K : never }[keyof T];

type TypeActions<Api, T> = {
  [A in TypePropertyNames<Api, T>]: Api[A] extends T ? Pick<Api[A], keyof T> : any
};

type StringKeys<T> = Extract<keyof T, string>;

type GetActions<Api> = TypeActions<Api, { readonly get: Readonly<GetParams> }>;
type PostActions<Api> = TypeActions<Api, { readonly post: Readonly<PostParams> }>;
type DeleteActions<Api> = TypeActions<Api, { readonly delete: Readonly<DeleteParams> }>;
type PatchActions<Api> = TypeActions<Api, { readonly patch: Readonly<PatchParams>}>

export interface ApiRequestor<Api extends ApiBase<StringKeys<Api>>> {
  getJson<Action extends keyof GetActions<Api>>(
    action: Action,
    params: GetActions<Api>[Action]['get']['params']
  ): Promise<GetActions<Api>[Action]['get']['response']>

  postJson<Action extends keyof PostActions<Api>>(
    action: Action,
    params: PostActions<Api>[Action]['post']['params'],
    postData: PostActions<Api>[Action]['post']['postData'],
  ): Promise<PostActions<Api>[Action]['post']['response']>;

  deleteJson<Action extends keyof DeleteActions<Api>>(
    action: Action,
    params: DeleteActions<Api>[Action]['delete']['params']
  ): Promise<DeleteActions<Api>[Action]['delete']['response']>

  patchJson<Action extends keyof PatchActions<Api>>(
    action: Action,
    params: PatchActions<Api>[Action]['patch']['params'],
    patchData: PatchActions<Api>[Action]['patch']['patchData'],
  ): Promise<PatchActions<Api>[Action]['patch']['response']>
}

import axios from 'axios';

export class Requestor implements ApiRequestor<any> {
  private requestor = axios.create();

  async getJson<T = Object>(action: string, params: Object): Promise<T> {
    const { data } = await this.requestor.get<T>(action, { params });
    return data;
  }

  async postJson<T = Object>(action: string, params: Object, postData: Object): Promise<T> {
    const { data } = await this.requestor.post(action, postData, { params });
    return data;
  }

  async deleteJson<T = Object>(action: string, params: Object): Promise<T> {
    const { data } = await this.requestor.delete(action, { params });
    return data;
  }

  async patchJson<T = Object>(action: string, params: Object, patchData: Object): Promise<T> {
    const { data } = await this.requestor.patch(action, patchData, { params });
    return data;
  }
}
