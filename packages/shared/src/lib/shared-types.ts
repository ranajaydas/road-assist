export interface IncidentDetails {
  regNo: string;
  contact: string;
  description: string;
}

export interface ProviderDetails {
  name: string;
  phone: string;
  rating: number;
  pictureURL: string;
  company: string;
  regNo: string;
}

export interface LocationCoords {
  lat: number;
  lng: number;
}

export type CustomerIncident = IncidentDetails | IncidentDetails & LocationCoords;

export type IncidentStatus = 
'notCreated' | 
'submitting' | 
'created' | 
'providerSent' | 
'providerArrived' |
'completed' | 
'userCancelled' | 
'providerCancelled';