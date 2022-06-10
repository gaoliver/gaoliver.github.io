import { store } from 'src/redux';

export const handleWindowPosition = (id: string) => {
  if (store.getState().windowOnFocus === id) {
    return 10000;
  } else {
    return 100
  }
}
