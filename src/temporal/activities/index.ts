import { Hotel } from "src/hotels/dto/hotel.type";

// Export activity function signatures for Temporal workflows
export async function getHotelsByCity(query,supplierName): Promise<Hotel[]> {
  // This will be implemented by the worker binding
  throw new Error('Activity function should be implemented by worker');
}
