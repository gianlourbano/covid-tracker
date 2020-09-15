import React from "react"

import Content from "./Main/Content"

import { createStackNavigator } from '@react-navigation/stack';
import TotalCases from "./Main/TotalCases";
const HomeStack = createStackNavigator();

const Main: React.FC = () => {
    return(
        <HomeStack.Navigator>
            <HomeStack.Screen name="Home" component={Content} />
            <HomeStack.Screen name="TotalCases" component={TotalCases} />
        </HomeStack.Navigator>
    )
}


export default Main