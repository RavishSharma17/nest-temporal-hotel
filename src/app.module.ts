import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HotelsModule } from './hotels/hotels.module';
import { TemporalModule } from './temporal/temporal.module';
import { SupplierModule } from './supplier/supplier.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    HotelsModule, 
    TemporalModule, 
    SupplierModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
