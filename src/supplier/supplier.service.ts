import { Injectable } from '@nestjs/common';
import { Hotel } from 'src/hotels/dto/hotel.type';
const dataSet = require('../../datasets/supplier-data.json');
@Injectable()
export class SupplierService {
    // @todo: fetch the data set from a DB or cache.
    getHotelsBySupplierName(supplierName: string):Hotel[]  {
        let x = dataSet[supplierName];
        return x ?? [];
    }

}
