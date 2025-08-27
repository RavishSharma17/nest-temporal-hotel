import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client, Connection } from '@temporalio/client';
import { getHotelsByCityWorkflow } from '../workflows/hotels.workflow';

@Injectable()
export class TemporalClientService implements OnModuleInit {
  private client: Client;

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    const address = this.configService.get<string>('TEMPORAL_ADDRESS', 'localhost:7233');
    
    const connection = await Connection.connect({
      address,
    });
    
    this.client = new Client({
      connection,
    });
  }

  async executeHotelsByCityWorkflow(query): Promise<string[]> {
    const taskQueue = this.configService.get<string>('TEMPORAL_TASK_QUEUE', 'hotels-task-queue');
    
    const handle = await this.client.workflow.start(getHotelsByCityWorkflow, {
      taskQueue,
      workflowId: `get-hotels-${Date.now()}`,
      // startDelay: 1000,
      args: [query]
    });

    return await handle.result();
  }

}