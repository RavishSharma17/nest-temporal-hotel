import { Module, forwardRef } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { HotelsController } from './hotels.controller';
import { TemporalModule } from '../temporal/temporal.module';
import { SupplierService } from 'src/supplier/supplier.service';
// import { SupplierModule } from 'src/supplier/supplier.module';
@Module({
  imports: [forwardRef(() => TemporalModule)],
  providers: [HotelsService, SupplierService],
  controllers: [HotelsController],
  exports: [HotelsService],
})
export class HotelsModule {}
