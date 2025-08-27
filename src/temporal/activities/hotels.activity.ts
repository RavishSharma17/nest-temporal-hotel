import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { HotelsService } from '../../hotels/hotels.service';
import { Hotel } from 'src/hotels/dto/hotel.type';

@Injectable()
export class HotelsActivity {
    constructor(
        @Inject(forwardRef(() => HotelsService))
        private readonly hotelsService: HotelsService
    ) {}

    async getHotelsByCity(query, supplierName): Promise<Hotel[]> {
        return this.hotelsService.getHotelsByCity(query, supplierName);
    }

}