import { useAtom } from 'jotai';
import styled from '@emotion/styled';
import { Button, FormGroup, TextField } from '@mui/material';
import NearMeIcon from '@mui/icons-material/NearMe';
import { useNavigate } from 'react-router-dom';

import { incidentDetailsAtom, incidentStatusAtom } from '../../state/incidents';

const StyledForm = styled('form')({
  height: '50%',
});

const StyledFormGroup = styled(FormGroup)({
  display: 'flex',
  flexWrap: 'nowrap',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '0 2rem 2rem 2rem',
  height: '100%',
});

const StyledFieldContainer = styled('div')({
  width: '100%',
});

const StyledTextField = styled(TextField)({
  marginBottom: '1rem',
  width: '100%',
});

const HomeForm = (): JSX.Element => {
  const navigate = useNavigate();
  const [incidentDetails, setIncidentDetails] = useAtom(incidentDetailsAtom);
  const [incidentStatus] = useAtom(incidentStatusAtom);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (incidentStatus === 'notCreated') {
      // Clean up any previous saved state
      localStorage.removeItem('userLocationCoordsAtom');
      localStorage.removeItem('providerLocationCoordsAtom');
      localStorage.removeItem('directionsAtom');

      // Save the incident details
      const formData = new FormData(event.currentTarget);
      setIncidentDetails({
        regNo: formData.get('regNo') as string,
        contact: formData.get('contact') as string,
        description: formData.get('description') as string,
      });
    }
    navigate('/map');
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledFormGroup>
        <StyledFieldContainer>
          <StyledTextField
            name="regNo"
            label="Registration Number"
            placeholder="What's your car's Registration Number?"
            variant="standard"
            defaultValue={incidentDetails.regNo}
            disabled={!(incidentStatus === 'notCreated')}
            required
          />
          <StyledTextField
            name="contact"
            label="Contact Number"
            placeholder="What's your phone number?"
            variant="standard"
            defaultValue={incidentDetails.contact}
            disabled={!(incidentStatus === 'notCreated')}
            required
          />
          <StyledTextField
            name="description"
            label="Description of incident"
            multiline
            rows={3}
            placeholder="Can you describe what happened?"
            variant="standard"
            defaultValue={incidentDetails.description}
            disabled={!(incidentStatus === 'notCreated')}
            required
          />
        </StyledFieldContainer>
        <Button type="submit" variant="contained" endIcon={<NearMeIcon />}>
          {incidentStatus === 'notCreated'
            ? 'Find me (use GPS)'
            : 'Return to map'}
        </Button>
      </StyledFormGroup>
    </StyledForm>
  );
};

export default HomeForm;
