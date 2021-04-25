import { useMutation, useQuery } from 'queries/base';
import { requestor } from 'context/requestor';

export function getImportantEmailsQuery() {
  return useQuery('IMPORTANT_EMAILS', () => {
    return requestor.getJson('/api/important_emails', undefined);
  });
}

export function getImportantEmailsAddMutation() {
  return useMutation<void, string>(email => {
    return requestor.patchJson('/api/important_emails', { email }, undefined);
  }, 'IMPORTANT_EMAILS')
}

export function getImportantEmailsRemoveMutation() {
  return useMutation<void, string>(email => {
    return requestor.deleteJson('/api/important_emails', { email });
  }, 'IMPORTANT_EMAILS')
}
