import React from 'react';
import {StyleSheet, View, Text, Button, Alert} from 'react-native';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';

import Main from "./src/pages/Main"

// Create the client as outlined in the setup guide
const client = new ApolloClient({
  cache: new InMemoryCache(),
});

const App = () => (
  <ApolloProvider client={client}>
    <View style={styles.root}>
      <Main />
    </View>
  </ApolloProvider>
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
