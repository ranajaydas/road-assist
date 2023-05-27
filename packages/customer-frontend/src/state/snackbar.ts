import { atom } from 'jotai';

interface SnackBarProps {
  message: string;
  severity?: 'success' | 'error' | 'info' | 'warning';
  disable?: boolean;
}

export const snackbarAtom = atom<SnackBarProps>({ message: '', severity: 'error' });
