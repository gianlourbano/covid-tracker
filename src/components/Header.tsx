import React from "react"
import { View, StyleSheet } from "react-native"

import { Button } from "react-native-elements"

const Header: React.FC = () => {
    return(
        <View style={styles.root}>
            <Button
                title="Country"
                type="clear"
            />
            <Button
                title="Homepage"
                type="clear"
            />
            <Button
                title="About"
                type="clear"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        paddingTop: 10,
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: 60,
    },
    title: {
        textAlign: 'center',
    },
});

export default Header