import { Body, Controller, Post } from '@nestjs/common';
import { CustomerIncident, LocationCoords } from '@roadside-assist/shared';
import { IncidentGateway } from './incident.gateway';
import { execSync } from 'child_process';
import defaults from '../../defaults';

@Controller('incident')
export class IncidentController {
  constructor(private incidentGateway: IncidentGateway) {}

  @Post('create')
  createIncident(
    @Body() incident: CustomerIncident
  ): Promise<CustomerIncident> {
    console.log('Incident received:', incident);
    
    // Add an aritificial delay to simulate a real-world scenario
    execSync(`sleep ${defaults.delayToCreateIncident}`);
    
    this.incidentGateway.publishIncidentCreated(incident);
    return Promise.resolve(incident);
  }

  @Post('provider-arrived')
  providerArrived(
    @Body() incident: CustomerIncident
  ): Promise<boolean> {
    console.log('Provdider arrived:', incident);
    this.incidentGateway.publishProviderArrived();
    return Promise.resolve(true);
  }

  @Post('user-cancel')
  userCancel(
    @Body() incident: CustomerIncident
  ): Promise<boolean> {
    console.log('Cancellation request from user:', incident);
    this.incidentGateway.publishIncidentUserCancelled();
    return Promise.resolve(true);
  }

  @Post('user-complete')
  userComplete(
    @Body() incident: CustomerIncident
  ): Promise<boolean> {
    console.log('Completion request from user:', incident);
    this.incidentGateway.publishIncidentUserCompleted();
    return Promise.resolve(true);
  }

  @Post('simulate-driving')
  async simulateDriving(
    @Body() providerLocation: LocationCoords
  ): Promise<void> {
    console.log('New location received:', providerLocation);
    this.incidentGateway.publishProviderLocationUpdate(providerLocation);
  }
}
