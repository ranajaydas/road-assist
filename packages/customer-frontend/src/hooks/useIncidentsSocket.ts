import { useEffect } from 'react';
import io from 'socket.io-client';
import { useAtom } from 'jotai';

import defaults from '../../defaults';
import {
  createIncidentAtom,
  incidentsSocketConnectedAtom,
  incidentStatusAtom,
  providerDetailsAtom,
  providerLocationCoordsAtom,
} from '../state/incidents';

const socketURL = `${window.location.protocol}//${window.location.hostname}:${defaults.webSocketPort}`;
const socket = io(socketURL);
let shouldLog = true;

export const useIncidentsSocket = (): void => {
  const [, setIsConnected] = useAtom(incidentsSocketConnectedAtom);
  const [, createIncident] = useAtom(createIncidentAtom);
  const [, setIncidentStatus] = useAtom(incidentStatusAtom);
  const [, setProviderLocationCoords] = useAtom(providerLocationCoordsAtom);
  const [, setProviderDetailsAtom] = useAtom(providerDetailsAtom);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('socket connect');
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      console.log('socket disconnect');
      setIsConnected(false);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, [setIsConnected]);

  useEffect(() => {
    if (shouldLog) {
      console.log('registering incident:created socket');
      socket.on('incident:created', (data) => {
        console.log('socket incident:created', data);
        createIncident(data);
        setIncidentStatus('created');
      });

      socket.on('incident:provider_sent', (data) => {
        console.log('socket incident:provider_sent', data);
        setIncidentStatus('providerSent');
        setProviderDetailsAtom(data);
      });

      socket.on('incident:provider_location_update', (data) => {
        console.log('socket incident:provider_location_update', data);
        setProviderLocationCoords({lat: Number(data.lat), lng: Number(data.lng)});
      });

      socket.on('incident:provider_arrived', (data) => {
        console.log('socket incident:provider_arrived', data);
        setIncidentStatus('providerArrived');
      });

      socket.on('incident:provider_cancelled', () => {
        console.log('socket incident:provider_cancelled');
        //TODO: take appropriate actions if provider cancels
        setIncidentStatus('providerCancelled');
      });

      socket.on('incident:user_cancelled', () => {
        console.log('socket incident:user_cancelled');
      });

      socket.on('incident:user_completed', () => {
        console.log('socket incident:user_completed');
      });


      shouldLog = false;
    }
  }, [createIncident, setIncidentStatus, setProviderDetailsAtom, setProviderLocationCoords]);
};
