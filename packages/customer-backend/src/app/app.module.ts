import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IncidentModule } from '../incident/incident.module';

@Module({
  imports: [IncidentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
