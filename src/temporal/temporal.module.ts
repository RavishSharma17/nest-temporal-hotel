import { Module, forwardRef } from '@nestjs/common';
import { HotelsModule } from '../hotels/hotels.module';
import { TemporalClientService } from './services/temporal-client.service';
// import { TemporalWorkerService } from './services/temporal-worker.service';
import { HotelsActivity } from './activities/hotels.activity';
import { TemporalController } from './temporal.controller';

@Module({
  imports: [forwardRef(() => HotelsModule)],
  providers: [
    TemporalClientService,
    // TemporalWorkerService,
    HotelsActivity,
  ],
  exports: [TemporalClientService],
  controllers: [TemporalController],
})
export class TemporalModule {}
