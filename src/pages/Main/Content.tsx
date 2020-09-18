import React from "react"
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native"
import { Button } from "react-native-elements"
import { useQuery } from "react-query"
import ContentBlock from "../../components/ContentBlock"

const virus = require("../../assets/virus.png")
const death = require("../../assets/death.png")
const mask = require("../../assets/mask.png")

export interface SummaryData {
    NewConfirmed: number,
    TotalConfirmed: number,
    NewDeaths: number,
    TotalDeaths: number,
    NewRecovered: number,
    TotalRecovered: number,
}

export function numberWithSpaces(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

const Content: React.FC<{ navigation: any}> = ({ navigation }) => {

    const { data, isFetching, refetch } = useQuery("covid", () => {
        return fetch("https://corona-virus-stats.herokuapp.com/api/v1/cases/general-stats")
            .then(result => result.json())
    })

    return(
        <View>
            <ScrollView>
                <View style={styles.root}>
                    <Text style={styles.title}>COVID-19 Summary</Text>
                    <ActivityIndicator size="large" animating={isFetching}/>
                    {data && !isFetching && (
                        <>
                            <ContentBlock text="Total Cases" data={numberWithSpaces(data?.data.total_cases)} icon={virus} />
                            <ContentBlock text="Total Deaths" data={numberWithSpaces(data?.data.death_cases)} icon={death} secondary inverted />
                            <ContentBlock text="Total Recovered" data={numberWithSpaces(data?.data.recovered_closed_cases)} icon={mask} />
                        </>
                    )}  
                </View>
                <View style={styles.actions}>
                    <Button
                        containerStyle={styles.button}
                        title="More Info"
                        onPress={() => {
                            navigation.navigate("More Info", {
                                data: data
                            })
                            
                        }}
                    />
                    <Button 
                        containerStyle={styles.button}
                        buttonStyle={{ backgroundColor: "#DD76A2"}}
                        onPress={() => refetch()}
                        title="Update"
                    />
                    <Button
                        containerStyle={styles.button}
                        title="Daily"
                        disabled
                    />
                </View>
                <Text style={[styles.title, { fontSize: 25 }]}>{data?.data.last_update}</Text>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
        display: "flex",
        alignItems: "stretch",
    },
    title: {
        color: "#57596F",
        textAlign: "center",
        fontSize: 35
    },
    date: {
        marginTop: 40
    },
    actions: {
        display: "flex",
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