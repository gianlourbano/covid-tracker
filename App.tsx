import 'react-native-gesture-handler' 
import React from 'react' 
import { ThemeProvider } from 'react-native-elements'

import { NavigationContainer } from '@react-navigation/native'
import { BottomMenu } from "./src/components/BottomMenu" 

const theme = {
  colors: {
    primary: "#7884BF",
    secondary: "#DD76A2"
  }
} 

const App = () => (
  <ThemeProvider theme={theme}>
      <NavigationContainer>
        <BottomMenu />
      </NavigationContainer>
  </ThemeProvider>
  
) 

export default App 
