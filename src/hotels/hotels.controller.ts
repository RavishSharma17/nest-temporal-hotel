import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { TemporalClientService } from '../temporal/services/temporal-client.service';
import { HotelsDto } from './dto/hotels.dto';

@Controller('api/hotels')
export class HotelsController {
    constructor(private readonly temporalClientService: TemporalClientService) {}

    @Get()
    async getHotelsByCity(@Query() query: HotelsDto): Promise<string[]> {
        return this.temporalClientService.executeHotelsByCityWorkflow(query);
    }

}
