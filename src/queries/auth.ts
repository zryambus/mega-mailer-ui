import { useMutation, useQuery } from 'queries/base';
import { requestor } from 'context/requestor';

export function getUserQuery() {
  return useQuery('USER', async () => {
    try {
      const user = await requestor.getJson('/whoami', undefined);
      return user;
    } catch {
      return null;
    }
  });
}

export function getUserMutation() {
  return useMutation<void, { username: string, code: string }>(async (params) => {
    return requestor.postJson('/login', undefined, params);
  }, 'USER');
}

export function getLogoutMutation() {
  return useMutation<void, void>(() => {
    return requestor.getJson('/logout', undefined)
  });
}
