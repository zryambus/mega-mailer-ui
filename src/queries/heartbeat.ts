import { useQuery } from 'queries/base';
import { requestor } from 'context/requestor';

export function getHeartbeatQuery() {
  return useQuery('HEARTBEAT', () => {
    return requestor.getJson('/api/heartbeat', undefined);
  }, { refetchInterval: 30000, refetchOnMount: 'always', refetchOnWindowFocus: 'always' });
}
