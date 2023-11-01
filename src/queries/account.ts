import { useMutation, useQuery } from '~/src/queries/base';
import { requestor } from '~/src/context/requestor';

export function getAccountQuery() {
  return useQuery('ACCOUNT', () => {
    return requestor.getJson('/api/account', undefined);
  });
}

export function getAccountMutation() {
  return useMutation<void, { email: string, password: string }>(params => {
    return requestor.postJson('/api/account', undefined, params);
  }, 'ACCOUNT');
}

export function getCheckingQuery() {
  return useQuery('CHECKING', () => {
    return requestor.getJson('/api/checking', undefined);
  });
}

export function getCheckingMutation() {
  return useMutation<void, boolean>(state => {
    return requestor.postJson('/api/checking', undefined, { state });
  }, 'CHECKING')
}
