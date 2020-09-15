import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import { ThemeProvider } from 'react-native-elements';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';

import Main from "./src/pages/Main"

// Create the client as outlined in the setup guide
const client = new ApolloClient({
  cache: new InMemoryCache(),
});

const theme = {
  colors: {
    primary: "#7884BF",
    secondary: "#DD76A2"
  }
};

const App = () => (
  <ThemeProvider theme={theme}>
    <ApolloProvider client={client}>
      <View style={styles.root}>
        <Main />
      </View>
    </ApolloProvider>
  </ThemeProvider>
  
);

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
  },
});
export default App;
