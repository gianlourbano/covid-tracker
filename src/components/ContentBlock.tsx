import React, { ReactNode } from "react"
import { Image, ImageProps, StyleSheet, Text, View } from "react-native"

import * as Animatable from 'react-native-animatable';
import Skeleton from "./Skeleton/Skeleton";

interface Props {
    text: string,
    data?: number | string, 
    secondary?: boolean,
    inverted?: boolean,
    icon?: Readonly<ImageProps> & Readonly<{ children?: ReactNode; }>,
    loading?: boolean,
    main?: boolean,
    shrink?: boolean,
    noAnim?: boolean
}

const imageDims = 60

const ContentBlock: React.FC<Props> = ({ text, data, secondary, icon, inverted, loading, main, shrink, noAnim}) => {
    return(
        <Animatable.View
                        animation={!noAnim ? "bounceIn" : ""}
                        duration={500}
                        useNativeDriver
                        style={[
                            styles.summary,
                            (!loading && styles.summaryNotLoading), 
                            (secondary ? styles.pink : styles.blue),
                            (inverted && !loading && styles.inverted),
                            (shrink && {flexShrink: 1})
                            ]}>
            {loading ? 
                <View style={[styles.skeleton, (inverted &&  styles.inverted)]}>
                    {icon ? 
                        <>
                            <View>
                                <Skeleton width={130} />
                                <Skeleton width={100} />
                            </View>
                            <Skeleton width={imageDims} height={imageDims} />
                        </> 
                        : 
                        <>
                            <View style={{flexGrow: 1}}>
                                <Skeleton width="80%" />
                                <Skeleton width="60%" />
                            </View>
                        </> 
                    }
                </View>
                : 
                <>
                    <View>
                        <Animatable.Text animation={!noAnim ? "bounceIn" : ""} delay={!main ? 300 : 0} style={styles.text}>{text}</Animatable.Text>
                        <Animatable.Text animation={!noAnim ? "bounceIn" : ""} delay={!main ? 300 : 0} style={styles.text}>{data}</Animatable.Text>
                    </View>
                    {icon && <Animatable.Image animation={!noAnim ? "bounceIn" : ""} delay={!main ? 300 : 0} source={icon} style={styles.image} />}
                </>
                }
        </Animatable.View>
    )
}

const styles = StyleSheet.create({
    summary: {
        margin: 10,
        borderRadius: 20,
        flexGrow: 1,
    },
    summaryNotLoading: {
        padding: 20,
        flexDirection: "row",
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
        width: imageDims,
        height: imageDims,
    },
    inverted: {
        flexDirection: "row-reverse",
    },
    skeleton: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        margin: 10,
        alignItems: "center",
        paddingLeft: 10,
        paddingBottom: 10,
        paddingRight: 10,
        borderRadius: 10,
        opacity: 0.7,
    }
});

export default ContentBlock