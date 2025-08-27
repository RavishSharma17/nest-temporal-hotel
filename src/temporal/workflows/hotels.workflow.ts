import { proxyActivities } from '@temporalio/workflow';
import type * as activities from '../activities';

const { getHotelsByCity } = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
});

export async function getHotelsByCityWorkflow(query: object): Promise<string[]> {
  return await getHotelsByCity(query);
}