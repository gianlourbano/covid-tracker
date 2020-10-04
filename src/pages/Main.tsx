import React from "react"

import Content from "./Main/Content"

import { createStackNavigator } from '@react-navigation/stack';
import TotalCases from "./Main/TotalCases";
import Daily from "./Main/Daily"

const HomeStack = createStackNavigator();

const Main: React.FC = () => {
    return(
        <HomeStack.Navigator>
            <HomeStack.Screen options={{ headerShown: false }} name="Home" component={Content} />
            <HomeStack.Screen name="More Info" component={TotalCases} />
            <HomeStack.Screen name="Daily" component={Daily} />
        </HomeStack.Navigator>
    )
}


export default Main