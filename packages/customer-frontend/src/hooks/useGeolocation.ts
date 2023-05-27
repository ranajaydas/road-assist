import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';

import { userLocationCoordsAtom } from '../state/incidents';
import { snackbarAtom } from '../state/snackbar';

const mapOptions = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 0,
};

export const useGeolocation = (): void => {
  const [error, setError] = useState<boolean>(false);
  const [userLocationCoords, setUserLocationCoords] = useAtom(
    userLocationCoordsAtom
  );
  const [, setSnackbarData] = useAtom(snackbarAtom);

  useEffect(() => {
    if (!userLocationCoords && !error) {
      setSnackbarData({
        message: 'Trying to locate you...',
        severity: 'info',
      });
    }
    if (userLocationCoords && !error) {
      setSnackbarData({
        message: '',
        severity: 'info',
        disable: true
      });
    }
    if (!userLocationCoords && error) {
      setSnackbarData({
        message: 'Unable to get your location. Please enable location access or enter it manually.',
        severity: 'warning',
      });
    }
  },[userLocationCoords, error, setSnackbarData])

  if (navigator?.geolocation && !userLocationCoords) {
    navigator.geolocation.getCurrentPosition(
      (location) => {
        if (location) {
          const locationCoords = {
            lat: location.coords.latitude,
            lng: location.coords.longitude,
          };
          setUserLocationCoords(locationCoords);
        }
      },
      (err: GeolocationPositionError) => {
        setError(true);
        throw new Error(`ERROR(${err.code}): ${err.message}`);
      },
      mapOptions
    );
  }
};
