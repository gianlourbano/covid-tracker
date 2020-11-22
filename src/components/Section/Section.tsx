import React from "react"

import { StyleSheet, View } from "react-native"

const Section: React.FC<{color: string}> = ({children, color}) => {
    
    const colorProp = {
        backgroundColor: color
    }
    return(
        <View style={[styles.root, colorProp]}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: "#aaaaac",
        height: "100%",
        paddingBottom: 170,
        marginTop: 10,
        padding: 10
    }
})

export default Section