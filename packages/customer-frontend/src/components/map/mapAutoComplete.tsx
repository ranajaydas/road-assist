import { useState, useEffect } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { useAtom } from 'jotai';
import { styled } from '@mui/material/styles';
import { Paper, OutlinedInput, InputAdornment } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import { LocationCoords } from '@roadside-assist/shared';
import {
  userLocationCoordsAtom,
  userLocationTextAtom,
} from '../../state/incidents';
import defaults from '../../../defaults';

const StyledAutocomplete = styled(Autocomplete)({
  position: 'absolute',
  left: 0,
  top: 0,
  padding: '2rem',
  width: '100%',
});

const StyledTextField = styled(OutlinedInput)({
  width: '100%',
});

type AutocompleteProps = google.maps.places.Autocomplete;

const MapAutoComplete = (): JSX.Element => {
  const [autoComplete, setAutoComplete] = useState<AutocompleteProps>();
  const [userLocationCoords, setUserLocationCoords] = useAtom(
    userLocationCoordsAtom
  );
  const [userLocationText, setUserLocationText] = useAtom(userLocationTextAtom);

  const onLoad = (autoComplete: AutocompleteProps) => {
    setAutoComplete(autoComplete);
  };

  const onPlaceChanged = () => {
    if (autoComplete !== null) {
      const place = autoComplete?.getPlace();
      const location = place?.geometry?.location;
      const address = place?.formatted_address;
      if (location)
        setUserLocationCoords({ lat: location.lat(), lng: location.lng() });
      if (address) setUserLocationText(address);
    } else console.log('Autocomplete is not loaded yet');
  };

  // Reverse Geocode the user's location
  const reverseGeocode = (locationCoords: LocationCoords) => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: locationCoords }, (results, status) => {
      if (status === 'OK' && results) {
        setUserLocationText(results[0].formatted_address);
      }
    });
  };

  useEffect(() => {
    if (userLocationCoords) {
      reverseGeocode(userLocationCoords);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLocationCoords]);

  return (
    <StyledAutocomplete
      onLoad={onLoad}
      onPlaceChanged={onPlaceChanged}
      fields={['geometry', 'formatted_address']}
      restrictions={{
        country: defaults.autoCompleteCountries,
      }}
    >
      <Paper>
        <StyledTextField
          placeholder="Manually enter address"
          size="small"
          value={userLocationText}
          onChange={(e) => setUserLocationText(e.target.value)}
          startAdornment={
            <InputAdornment position="start">
              <IconButton aria-label="location" edge="start" sx={{ pr: 0 }}>
                <LocationOnIcon />
              </IconButton>
            </InputAdornment>
          }
          endAdornment={
            userLocationText && (
              <InputAdornment position="end">
                <IconButton
                  aria-label="location"
                  edge="end"
                  onClick={() => setUserLocationText('')}
                >
                  <CloseIcon />
                </IconButton>
              </InputAdornment>
            )
          }
        />
      </Paper>
    </StyledAutocomplete>
  );
};

export default MapAutoComplete;
