import { Injectable } from '@nestjs/common';
const dataSet = require('../../datasets/supplier-data.json');
@Injectable()
export class SupplierService {

    getHotelsBySupplierName(supplierName: string) {
        return dataSet[supplierName];
    }

}
