import React, { useEffect, useState } from "react"
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native"
import { Button } from "react-native-elements"
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

interface CovidData {
    data: {
        total_cases: number,
        recovery_cases: number,
        death_cases: number,
        last_update: string,
        currently_infected: number,
        cases_with_outcome: number,
        mild_condition_active_cases: number,
        critical_condition_active_cases: number,
        recovered_closed_cases: number,
        death_closed_cases: number,
        closed_cases_recovered_percentage: number,
        closed_cases_death_percentage: number,
        active_cases_mild_percentage: number,
        active_cases_critical_percentage: number,
        general_death_rate: number
    },
}

export function numberWithSpaces(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

const Content: React.FC<{ navigation: any}> = ({ navigation }) => {

    const [data, setData] = useState<CovidData>()
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        var date = new Date().getDate()
        var month = new Date().getMonth() + 1
        var year = new Date().getFullYear()

        var yesterday = month < 10 ? `${year}-0${month}-${date - 1}` : `${year}-${month}-${date - 1}`
        var today = month < 10 ? `${year}-0${month}-${date}` : `${year}-${month}-${date}`

        setLoading(true)

        fetch("https://corona-virus-stats.herokuapp.com/api/v1/cases/general-stats")
            .then(result => result.json())
            .then(response => {
                setData(response)
            })
            .catch(err => {
                console.log(err);
            });
    }, [])

    return(
        <View>
            <ScrollView>
                <View style={styles.root}>
                    <Text style={styles.title}>COVID-19 Summary</Text>
                    {data && (
                        <>
                            <ContentBlock text="Total Cases" data={numberWithSpaces(data.data.total_cases)} icon={virus} />
                            <ContentBlock text="Total Deaths" data={numberWithSpaces(data.data.death_cases)} icon={death} secondary inverted />
                            <ContentBlock text="Total Recovered" data={numberWithSpaces(data.data.recovered_closed_cases)} icon={mask} />
                            
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
                        title="Daily"
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