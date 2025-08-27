import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HotelsModule } from './hotels/hotels.module';
// import { TemporalClientService } from './temporal/services/temporal-client.service';
import { TemporalWorkerService } from './temporal/services/temporal-worker.service';
import { HotelsActivity } from './temporal/activities/hotels.activity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    forwardRef(() => HotelsModule)
  ],
  providers: [
    // TemporalClientService,
    TemporalWorkerService,
    HotelsActivity,
  ],
})
export class WorkerModule {}