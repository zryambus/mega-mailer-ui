import { useMutation, useQuery } from '~/src/queries/base';
import { requestor } from '~/src/context/requestor';

export function getWorkingHoursQuery() {
  return useQuery('WORKING_HOURS', () => {
    return requestor.getJson('/api/working_hours', undefined);
  });
}

export function getWorkingHoursMutation() {
  return useMutation<void, [number, number]>(params => {
    return requestor.postJson('/api/working_hours', undefined, params);
  }, 'WORKING_HOURS')
}
