import React, { useContext } from 'react';
import { Provider } from 'react-redux'
import { store } from './redux/store';
import RootNavigator from './navigation/RootNavigator';
import { createTheme, GlobalStyles } from '@mui/material';
import {ThemeProvider} from '@mui/material/styles'
import ThemeContextProvider from './contexts/themeContext/themeContext';




function App() {


  const theme = createTheme({
    colorSchemes: {
      dark: true,
    }
  });




  return (
    <ThemeProvider theme={theme}>
      <ThemeContextProvider>
        <GlobalStyles styles={(theme) => ({
          body: {
            backgroundColor: theme.palette.background.default 
          }
        })} />
        <Provider store={store}>
          <RootNavigator />
        </Provider>
      </ThemeContextProvider>
    </ThemeProvider>
  );
}

export default App;
