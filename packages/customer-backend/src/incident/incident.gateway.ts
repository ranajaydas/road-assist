import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    WebSocketGateway,
    WebSocketServer,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
  // import { execSync } from 'child_process';

  import { CustomerIncident, LocationCoords, ProviderDetails } from '@roadside-assist/shared';
  import defaults from '../../defaults';

  
  const port = Number(process.env.NX_WEBSOCKET_PORT);
  const providerInitialLocation: LocationCoords = defaults.providerInitialLocation;
  const defaultProviderDetails = defaults.providerDetails;

  @WebSocketGateway(port, { cors: '*' })
  export class IncidentGateway
    implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
  {
    @WebSocketServer()
    server: Server;
  
    afterInit() {
      console.log('Socket gateway init');
    }
  
    handleConnection(socket: Socket): void {
      console.log('New connection', socket.handshake.url, socket.id);
    }
  
    handleDisconnect(socket: Socket): void {
      console.log('Client disconnected:', socket.id);
    }
  
    publishIncidentCreated(incident: CustomerIncident): void {
      console.log('Publishing incident:created', incident.regNo);
      this.server.emit('incident:created', incident);
      
      // // Add an aritificial delay to simulate a real-world scenario
      // execSync(`sleep ${defaults.delayToProviderSent}`);

      this.publishProviderSent(defaultProviderDetails);
    }

    publishProviderSent(providerDetails: ProviderDetails): void {
      console.log('Publishing incident:provider_sent', providerDetails);
      this.server.emit('incident:provider_sent', providerDetails);
      this.publishProviderLocationUpdate(providerInitialLocation);
    }

    publishProviderLocationUpdate(location: LocationCoords): void {
      console.log('Publishing incident:provider_location_update', location);
      this.server.emit('incident:provider_location_update', location);
    }

    publishProviderArrived(): void {
      console.log('Publishing incident:provider_arrived');
      this.server.emit('incident:provider_arrived');
    }

    publishIncidentUserCancelled(): void {
      console.log('Publishing incident:user_cancelled');
      this.server.emit('incident:user_cancelled');
    }

    publishIncidentUserCompleted(): void {
      console.log('Publishing incident:user_completed');
      this.server.emit('incident:user_completed');
    }

    publishIncidentProviderCancelled(): void {
      console.log('Publishing incident:provider_cancelled');
      this.server.emit('incident:provider_cancelled');
    }
  }
  