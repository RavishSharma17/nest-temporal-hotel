import { Controller, Get, Query } from '@nestjs/common';
import { TemporalClientService } from '../temporal/services/temporal-client.service';
import { HotelsDto } from './dto/hotels.dto';
import { Hotel } from './dto/hotel.type';

@Controller('api/hotels')
export class HotelsController {
    constructor(private readonly temporalClientService: TemporalClientService) {}

    @Get()
    async getHotelsByCity(@Query() query: HotelsDto): Promise<Hotel[]> {
        let response = this.temporalClientService.executeHotelsByCityWorkflow(query);
    
        return (await response).map(hotel => {
            delete hotel.city; // remove supplier field before sending response
            delete hotel.hotelId; // remove hotelId field before sending response
            return hotel;
        });
    }

}
