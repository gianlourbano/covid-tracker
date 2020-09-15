import React from "react"

import { View } from "react-native"

import Header from "../components/Header"
import Content from "../components/Content"

const Main: React.FC = () => {
    return(
        <View>
            <Header />
            <Content />
        </View>
    )
}


export default Main