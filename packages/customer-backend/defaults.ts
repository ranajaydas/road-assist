import { LocationCoords, ProviderDetails } from '@roadside-assist/shared';

const defaults = {
  delayToCreateIncident: 2,
  delayToProviderSent: 6,
  providerInitialLocation: {    // Botanic Gardens, Singapore
    lat: 1.3129823799611915,    
    lng: 103.81258135531114,
  } as LocationCoords,
  providerDetails: {
    name: 'Jay D',
    phone: '+65 88889999',
    rating: 4.9,
    pictureURL: 'https://media.licdn.com/dms/image/D5603AQGFAe6QLKIBow/profile-displayphoto-shrink_800_800/0/1674184747640?e=1690416000&v=beta&t=0NN8ev33Z2BVpKPovCvhRnkiLuxkFxsveyrrbbVftvg',
    company: 'Firemark Towing Co',
    regNo: 'L33T',
  } as ProviderDetails,
}

export default defaults;