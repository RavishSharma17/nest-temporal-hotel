import { Injectable } from '@nestjs/common';
import { SupplierService } from 'src/supplier/supplier.service';
import { Hotel } from './dto/hotel.type';

@Injectable()
export class HotelsService {
    constructor(private readonly supplierService: SupplierService) {}

    async getHotelsByCity(query: any, supplierName: string): Promise<Hotel[]>{
        let response = this.supplierService.getHotelsBySupplierName(supplierName);
        let filteredResponse = response.filter(hotel => hotel.city?.toLowerCase() === query.city?.toLowerCase())
        if (query?.minPrice) {
            filteredResponse = filteredResponse.filter(hotel => hotel.price >= query.minPrice);
        }
        if (query?.maxPrice) {
            filteredResponse = filteredResponse.filter(hotel => hotel.price <= query.maxPrice);
        }
        return filteredResponse;

    }

}
