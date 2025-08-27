import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { HotelsService } from '../../hotels/hotels.service';

@Injectable()
export class HotelsActivity {
    constructor(
        @Inject(forwardRef(() => HotelsService))
        private readonly hotelsService: HotelsService
    ) {}

    async getHotelsByCity(query): Promise<string> {
        return this.hotelsService.getHotelsByCity(query);
    }

}