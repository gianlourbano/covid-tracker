import 'react-native-gesture-handler' 
import React from 'react' 
import { ThemeProvider } from 'react-native-elements'

import { NavigationContainer } from '@react-navigation/native'
import { BottomMenu } from "./src/components/BottomNavigator/BottomMenu" 
import { QueryCache, ReactQueryCacheProvider } from 'react-query'

const queryCache = new QueryCache()

const theme = {
  colors: {
    primary: "#7884BF",
    secondary: "#DD76A2"
  }
} 

const App = () => (
  <ReactQueryCacheProvider queryCache={queryCache}>
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <BottomMenu />
      </NavigationContainer>
    </ThemeProvider>
  </ReactQueryCacheProvider>
  
  
) 

export default App 
