import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react"
import { View } from "react-native-animatable"

const Tab = createMaterialTopTabNavigator();

const Today: React.FC = () => {
    return(
        <View>

        </View>
    )
}

const History: React.FC<{navigation: any}> = ({navigation}) => {

    return(
        <Tab.Navigator>
            <Tab.Screen name="Today" component={Today} />
        </Tab.Navigator>
    )
}

export default History