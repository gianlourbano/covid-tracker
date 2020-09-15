import React from "react"
import { View, Text, StyleSheet } from "react-native"

const Header: React.FC = () => {
    return(
        <View style={styles.root}>
            <Text style={styles.title}>Header</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'stretch',
        height: 100,
        backgroundColor: "#63c5da"
    },
    title: {
        textAlign: 'center',
    },
});

export default Header