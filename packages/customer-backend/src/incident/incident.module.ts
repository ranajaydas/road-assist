import { Module } from '@nestjs/common';
import { IncidentGateway } from './incident.gateway';
import { IncidentController } from './incident.controller';

@Module({
  providers: [IncidentGateway],
  controllers: [IncidentController],
})
export class IncidentModule {}
