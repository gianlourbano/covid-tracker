import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react"
import { View } from "react-native-animatable"

import {SummaryData} from "./Content"
import ContentBlock from "../../components/ContentBlock"

const Tab = createMaterialTopTabNavigator();

const Content: React.FC<{route: any}> = ({route}) => {
    
    const data: SummaryData = route.params
    
    return(
        <View>
            <ContentBlock text="New Cases" data={data.new_cases}/>
        </View>
    )
}

const History: React.FC<{route: any}> = ({route}) => {

    const { data } = route.params

    return(
        <Tab.Navigator>
            <Tab.Screen name="Today" component={Content} initialParams={data[0]}/>
            <Tab.Screen name="Yesterday" component={Content} initialParams={data[1]}/>
            <Tab.Screen name="2 Days Ago" component={Content} initialParams={data[2]}/>
        </Tab.Navigator>
    )
}

export default History