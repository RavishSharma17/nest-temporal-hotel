import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NativeConnection, Worker } from '@temporalio/worker';
import { HotelsActivity } from '../activities/hotels.activity';
import * as path from 'path';

@Injectable()
export class TemporalWorkerService implements OnModuleInit {
  constructor(
    private readonly hotelsActivity: HotelsActivity,
    private readonly configService: ConfigService
  ) {}

  async onModuleInit() {
    const address = this.configService.get<string>('TEMPORAL_ADDRESS', 'localhost:7233');
    const namespace = this.configService.get<string>('TEMPORAL_NAMESPACE', 'default');
    const taskQueue = this.configService.get<string>('TEMPORAL_TASK_QUEUE', 'hotels-task-queue');

    const connection = await NativeConnection.connect({
      address,
    });

    const worker = await Worker.create({
      connection,
      namespace,
      taskQueue,
      workflowsPath: path.join(__dirname, '../workflows'),
      activities: {
        getHotelsByCity: this.hotelsActivity.getHotelsByCity.bind(this.hotelsActivity, arguments)
      },
    });

    // Run worker in background
    worker.run().catch(console.error);
  }
}