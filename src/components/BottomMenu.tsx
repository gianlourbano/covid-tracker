import React from "react" 
import { TabBar } from "./TabBar" 

import Main from "../pages/Main"
import About from "../pages/About"
import Country from '../pages/Main/Country' 

import { useSafeArea } from "react-native-safe-area-context" 
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
            {useSafeArea().bottom > 0 && (
                <View
                    style={{
                        height: useSafeArea().bottom - 5,
                        backgroundColor: "white",
                    }}
                />
            )}
        </View>
    ) 
} 