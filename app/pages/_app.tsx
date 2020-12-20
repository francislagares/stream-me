/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-constant-condition */
import { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import CssBaseLine from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { themeDark, themeLight } from 'lib/theme';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from 'lib/apollo';

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  const apolloClient = useApollo(pageProps.initialApolloState);
  const [darkTheme, setDarkTheme] = useState(false);
  const handleThemeChange = (): void => {
    setDarkTheme(!darkTheme);
  };

  // Remove the server-side injected CSS
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={darkTheme ? themeDark : themeLight}>
        <CssBaseLine />
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
