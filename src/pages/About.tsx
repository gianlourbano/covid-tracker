import React from "react"
import { StyleSheet, Text, View } from "react-native"

const virus = require("../assets/virus.png")

const About: React.FC = () => {
    return(
        <View style={styles.root}>
            <Text style={styles.text}>Covid-19 Tracker App</Text>
            <Text style={styles.text}>by UtterLabs</Text>
        </View>
    )
}

const styles=StyleSheet.create({
    root: {
        padding: 20
    },
    text: {
        fontSize: 20,
        textAlign: "center"
    },
})

export default About