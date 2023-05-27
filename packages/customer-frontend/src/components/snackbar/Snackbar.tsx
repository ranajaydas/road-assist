import { useCallback } from 'react';
import { useAtom } from 'jotai';
import { Alert, Snackbar as Snack } from '@mui/material';

import { snackbarAtom } from '../../state/snackbar';

const Snackbar = (): JSX.Element => {
  const [snackbarData, setSnackbarData] = useAtom(snackbarAtom);

  const clearSnackMessage = useCallback(
    () => setSnackbarData({ message: '', severity: 'error' }),
    [setSnackbarData]
  );

  return (
    <Snack
      open={Boolean(snackbarData.message)}
      autoHideDuration={6000}
      onClose={clearSnackMessage}
      disableWindowBlurListener={snackbarData.disable}
    >
      <Alert
        onClose={clearSnackMessage}
        severity={snackbarData.severity || 'error'}
        variant="filled"
      >
        {snackbarData.message}
      </Alert>
    </Snack>
  );
};

export default Snackbar;
