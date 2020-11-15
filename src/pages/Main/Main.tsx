import React from "react"

import Content from "./Content"

import { createStackNavigator } from '@react-navigation/stack';

const HomeStack = createStackNavigator();

const Main: React.FC = () => {
    return(
        <HomeStack.Navigator>
            <HomeStack.Screen options={{ headerShown: false }} name="Home" component={Content} />
        </HomeStack.Navigator>
    )
}


export default Main