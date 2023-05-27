const defaults = {
  apiURL: import.meta.env.VITE_API_URL || 'http://localhost:3333/api',
  googleMapsAPIKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  initialUserLatitude: 1.3521,        // Singapore's latitude
  intialUserLongitude: 103.8198,       // Singapore's longitude
  autoCompleteCountries: ['sg'],
  navBarHeight: '48px',
  webSocketPort: Number(import.meta.env.VITE_WEBSOCKET_PORT) || 4201,
}

export default defaults;