import { Controller, Get, Param } from '@nestjs/common';
import { SupplierService } from './supplier.service';

@Controller('')
export class SupplierController {

    constructor(private readonly supplierService: SupplierService) {}

    @Get(":supplier/hotels")
    getHotelsBySupplier(@Param('supplier') supplier: string): string {
        return this.supplierService.getHotelsBySupplierName(supplier);
    }

}
