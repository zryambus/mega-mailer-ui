import { useMutation, useQuery } from '~/src/queries/base';
import { requestor } from '~/src/context/requestor';

export function getImportantEmailsQuery() {
  return useQuery('IMPORTANT_EMAILS', () => {
    return requestor.getJson('/api/important_emails', undefined);
  });
}

export function getImportantEmailsMutation() {
  return useMutation<void, string[]>(emails => {
    return requestor.postJson('/api/important_emails', undefined, emails);
  }, 'IMPORTANT_EMAILS')
}

export function getImportantTagsQuery() {
  return useQuery('IMPORTANT_TAGS', () => {
    return requestor.getJson('/api/important_tags', undefined);
  });
}

export function getImportantTagsMutation() {
  return useMutation<void, string[]>(tags => {
    return requestor.postJson('/api/important_tags', undefined, tags);
  }, 'IMPORTANT_TAGS')
}

