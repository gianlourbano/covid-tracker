import React, { ReactNode } from "react"
import { Image, ImageProps, StyleSheet, Text, View } from "react-native"

interface Props {
    text: string,
    data?: number, 
    secondary?: boolean,
    inverted?: boolean,
    icon?: Readonly<ImageProps> & Readonly<{ children?: ReactNode; }>,
}

const ContentBlock: React.FC<Props> = ({ text, data, secondary, icon, inverted}) => {
    return(
        <View style={[styles.summary, (secondary ? styles.pink : styles.blue), (inverted && styles.inverted)]}>
            <View style={styles.secondaryContent}>
                <Text style={styles.text}>{text}</Text>
                <Text style={styles.text}>{data}</Text>
            </View>
            {icon && <Image source={icon} style={styles.image} />}
        </View>
    )
}

const styles = StyleSheet.create({
    summary: {
        margin: 10,
        borderRadius: 20,
        padding: 20,
        display: "flex",
        flexDirection: "row",
        maxHeight: 100,
        justifyContent: "space-evenly"
    },
    text: {
        color: "whitesmoke",
        fontSize: 22,
    },
    pink: { backgroundColor: "#DD76A2" },
    blue: { backgroundColor: "#7884BF" },
    image: {
        alignSelf: "flex-end",
        width: 60,
        height: 60,
    },
    secondaryContent: {
        display: "flex",
        flexDirection: "column"
    },
    inverted: {
        flexDirection: "row-reverse"
    }
});

export default ContentBlock