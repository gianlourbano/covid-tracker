import React, { useEffect, useRef } from "react"
import { ScrollView, StyleSheet, Text, View } from "react-native"
import { Button } from "react-native-elements"
import { useQuery } from "react-query"
import ContentBlock from "../../components/ContentBlock"
import axios from "axios"
import * as Animatable from 'react-native-animatable';


const virus = require("../../assets/virus.png")
const death = require("../../assets/death.png")
const mask = require("../../assets/mask.png")

export interface SummaryData {
    type: string,
    total_cases: string,
    new_cases: string,
    total_deaths: string,
    new_deaths: string,
    total_recovered: string,
    active_cases: string,
    critical_active_cases: string,
    time: string,
}

export function numberWithSpaces(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

const Content: React.FC<{ navigation: any}> = ({ navigation }) => {

    const { data, isFetching, refetch } = useQuery("covid", async () => {
        let { data }: { data: Array<SummaryData> } = await axios.get("https://covid19-scraper-utterlabs.herokuapp.com/api/data")
        return(data)
    }, {
        refetchOnWindowFocus: "always",
    })

    return(
        <View style={{marginBottom: 60}}>
            <Text style={styles.title}>COVID-19 Summary</Text>
            <ScrollView>
                <View style={styles.root}>
                    {data && !isFetching && (
                        <>
                            <ContentBlock text="Total Cases" data={data[0].total_cases} icon={virus} />
                            <ContentBlock text="Total Deaths" data={data[0].total_deaths} icon={death} secondary inverted />
                            <ContentBlock text="Total Recovered" data={data[0].total_recovered} icon={mask} />
                        </>
                    )}  
                </View>
                {!isFetching && (
                    <Animatable.View style={styles.actions} animation="bounceIn" duration={2000} delay={500} useNativeDriver>
                        <StyledButton title="Update"
                            func={() => refetch()}
                        />
                        <StyledButton title="Daily" func={() => navigation.navigate("Daily", {
                            data: data
                        })} />
                    </Animatable.View>
                )}
            </ScrollView>
        </View>
    )
}

const StyledButton: React.FC<{func: () =>{}, title: string}> = ({func, title}) => {
    return(
        <Button
            containerStyle={styles.button}
            onPress={func}
            title={title}
        />
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    title: {
        color: "#57596F",
        textAlign: "center",
        fontSize: 35,
        marginTop: 22,
    },
    date: {
        marginTop: 40
    },
    actions: {
        marginVertical: 40,
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    button: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        marginHorizontal: 20,
    },
});

export default Content