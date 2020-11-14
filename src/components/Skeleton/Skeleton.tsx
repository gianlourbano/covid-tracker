import React, { useEffect, useRef } from "react"
import { ImageStyle, StyleSheet, TextStyle, View, ViewStyle} from "react-native"

import * as Animatable from "react-native-animatable"

const skeletonAnim: Animatable.CustomAnimation<TextStyle & ViewStyle & ImageStyle> = {
    easing: "ease-out",
    0: {
        translateX: -400,
        opacity: 1,
    },
    1: {
        translateX: 400,
        opacity: 0.5,
    },
}

interface SkeletonProps {
    width?: number | string,
    height?: number | string
}

const Skeleton: React.FC<SkeletonProps> = ({ width, height }) => {

    const animationRef = useRef<Animatable.View & View>(null)

    const widthProp = {
        width: width,
    }
    const heightProp = {
        height: height,
    }

    useEffect(() => {
        return () => {
            animationRef.current?.fadeOut && animationRef.current?.fadeOut(1000)
            
        }
    }, [])

    return (
        <Animatable.View 
        ref={animationRef}
        style={[styles.root,
        (width ? widthProp : null),
        (height ? heightProp : null)
        ]}>
            <Animatable.View animation={skeletonAnim} duration={1000} iterationCount="infinite" style={styles.skeleton}></Animatable.View>
        </Animatable.View>
    )
}

const styles = StyleSheet.create({
    root: {
        marginTop: 10,
        position: "relative",
        backgroundColor: "#e0daeb",
        width: "75%",
        height: 25,
        overflow: "hidden",
        borderRadius: 10,
    },
    skeleton: {
        position: "absolute",
        top: 0,
        right: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(25, 9, 50, 0.1)",
    },
    card: {
        flexDirection: "row",
        margin: 10,
        alignItems: "center",
        backgroundColor: "#cacaca",
        paddingLeft: 10,
        paddingBottom: 10,
        paddingRight: 10,
        borderRadius: 10,
    }
})

export default Skeleton