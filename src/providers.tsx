'use client';

/* Core */
import { Provider } from 'react-redux';
import { store } from './store';
import { ThemeProvider } from 'next-themes';

/* Instruments */

export const Providers = (props: React.PropsWithChildren) => {
  return (
    <Provider store={store}>
      {/* <ThemeProvider> */}
      {props.children}
      {/* </ThemeProvider> */}
    </Provider>
  );
};
