import { proxyActivities } from '@temporalio/workflow';
import type * as activities from '../activities';
import { HotelsDto } from 'src/hotels/dto/hotels.dto';
import { Hotel } from 'src/hotels/dto/hotel.type';
const dataSet = require('../../../datasets/supplier-data.json');

const { getHotelsByCity } = proxyActivities<typeof activities>({
	startToCloseTimeout: '1 minute',
});

export async function getHotelsByCityWorkflow(query: HotelsDto): Promise<Hotel[]> {
	/**
	 * For all suppliers hit the getHotelsByCity for each supplier in parallel
	 * Aggregate the results and return min 
	 * Business logic resides here
	 */
	let suppliers = Object.keys(dataSet);
	let allSuppliersHotels = (await Promise.all(
		suppliers.map(async supplierName => {
			let result = await getHotelsByCity(query, supplierName)
			result.map(x => {
				x["supplier"] = supplierName;
				return x;
			});
			return result;
		}
		))).flat();

	// Remove duplicates, keep the one with the lowest price
	let hotelMap = {};
	for (let hotel of allSuppliersHotels) {
		if (!hotelMap[hotel.name]) {
			hotelMap[hotel.name] = hotel;
		} else {
			// If duplicate hotel, keep the one with the lowest price
			if (hotel.price < hotelMap[hotel.name].price) {
				hotelMap[hotel.name] = hotel;
			}
		}
	}

	return Object.values(hotelMap);
}