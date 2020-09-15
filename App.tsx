import 'react-native-gesture-handler';
import React from 'react';
import { Text, ThemeProvider } from 'react-native-elements'

import { NavigationContainer } from '@react-navigation/native'
import Main from "./src/pages/Main"
import About from "./src/pages/About"

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Country from './src/pages/Main/Country';

const Tab = createBottomTabNavigator();

const theme = {
  colors: {
    primary: "#7884BF",
    secondary: "#DD76A2"
  }
};


const App = () => (
  <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
        >
          <Tab.Screen name="Country" component={Country} />
          <Tab.Screen name="Home" component={Main} />
          <Tab.Screen name="About" component={About} />
        </Tab.Navigator>
      </NavigationContainer>
  </ThemeProvider>
  
);

export default App;
