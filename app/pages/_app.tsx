/* eslint-disable no-constant-condition */
import { useEffect } from 'react';
import { AppProps } from 'next/app';
import CssBaseLine from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { themeDark, themeLight } from 'lib/theme';

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  // Remove the server-side injected CSS
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);
  return (
    <ThemeProvider theme={false ? themeDark : themeLight}>
      <CssBaseLine />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default App;
