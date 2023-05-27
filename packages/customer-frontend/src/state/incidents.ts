import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils'

import { IncidentDetails, LocationCoords , CustomerIncident, IncidentStatus, ProviderDetails } from '@roadside-assist/shared';

export const incidentsAtom = atomWithStorage<CustomerIncident[]>('incidentsAtom', []);
export const incidentDetailsAtom = atomWithStorage<IncidentDetails>('incidentDetailsAtom',{
  regNo: '',
  contact: '',
  description: '',
});
export const createIncidentAtom = atom(
  null,
  (get, set, update: CustomerIncident) => {
    const incidents = get(incidentsAtom);
    set(incidentsAtom, [...incidents, update]);
  }
);

export const userLocationTextAtom = atomWithStorage<string>('userLocationTextAtom', '');
export const userLocationCoordsAtom = atomWithStorage<LocationCoords | undefined>('userLocationCoordsAtom', undefined);
export const providerLocationCoordsAtom = atomWithStorage<LocationCoords | undefined>('providerLocationCoordsAtom', undefined);
export const providerDetailsAtom = atomWithStorage<ProviderDetails | undefined>('providerDetailsAtom', undefined);

export const incidentsSocketConnectedAtom = atomWithStorage<boolean>('incidentsSocketConnectedAtom', false);

export const incidentStatusAtom = atomWithStorage<IncidentStatus>('incidentStatusAtom', 'notCreated');

export const directionsRenderedOnceAtom = atomWithStorage<boolean>('directionsRenderedOnceAtom', false);
export const directionsAtom = atomWithStorage<google.maps.DirectionsResult | undefined>('directionsAtom', undefined);
export const timeToArrivalAtom = atom(
  (get) => get(directionsAtom)?.routes[0]?.legs[0]?.duration,
);