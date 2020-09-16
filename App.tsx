import 'react-native-gesture-handler' 
import React from 'react' 
import { ThemeProvider } from 'react-native-elements'

import { NavigationContainer } from '@react-navigation/native'
import { BottomMenu } from "./src/components/BottomMenu" 
import { SafeAreaProvider } from 'react-native-safe-area-context' 

const theme = {
  colors: {
    primary: "#7884BF",
    secondary: "#DD76A2"
  }
} 

const App = () => (
  <ThemeProvider theme={theme}>
      <NavigationContainer>
      <SafeAreaProvider>
        <BottomMenu />
      </SafeAreaProvider>
      </NavigationContainer>
  </ThemeProvider>
  
) 

export default App 
