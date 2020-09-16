import React from "react" 
import { TabBar } from "./TabBar" 

import Main from "../pages/Main"
import About from "../pages/About"
import Country from '../pages/Main/Country' 

import { View } from "react-native" 
import { createMaterialTopTabNavigator, MaterialTopTabBarProps } from "@react-navigation/material-top-tabs" 
export const BottomMenu = () => {
    
    const Tab = createMaterialTopTabNavigator() 
    
    return (
        <View style={{ flex: 1, position: "relative" }}>
            <Tab.Navigator
                tabBarPosition="bottom"
                initialRouteName="home"
                tabBar={(props: MaterialTopTabBarProps) => <TabBar {...props} />}
                
            >
                <Tab.Screen name="globe-europe" component={Country} />
                <Tab.Screen name="home" component={Main} />
                <Tab.Screen name="globe" component={About} />
            </Tab.Navigator>
            
                <View
                    style={{
                        backgroundColor: "white",
                    }}
                />
        </View>
    ) 
} 