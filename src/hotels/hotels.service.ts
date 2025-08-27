import { Injectable } from '@nestjs/common';
import { SupplierService } from 'src/supplier/supplier.service';

@Injectable()
export class HotelsService {
    constructor(private readonly supplierService: SupplierService) {}

    getHotelsByCity(query: any) {
        this.somePrivateMethod();
        // if(query.city && !(query.minPrice || query.maxPrice)) {
        //     console.log('Calling Supplier Service to get hotels by supplier name');
        //     let A = this.supplierService.getHotelsBySupplierName('SupplierA');
        //     return A;
        //     // this.supplierService.getHotelsBySupplierName('SupplierB');
        // }

        console.log(JSON.stringify(query));

        return `city is ${query.city} minPrice is ${query.minPrice} maxPrice is ${query.maxPrice} `; // just a mock response
    }

    // to be removed later, only for logging observability in worker terminal
    private somePrivateMethod(): void {
        // This method is private and not exposed outside this service
        console.info('Started Running private method');
    }
}
