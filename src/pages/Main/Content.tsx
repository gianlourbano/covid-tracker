import React, { useEffect, useState } from "react"
import { Alert, StyleSheet, Text, View } from "react-native"
import { Button } from "react-native-elements"
import ContentBlock from "../../components/ContentBlock"

const virus = require("../../assets/virus.png")
const death = require("../../assets/death.png")
const mask = require("../../assets/mask.png")

export interface SummaryData {
    Global: {
        NewConfirmed: number,
        TotalConfirmed: number,
        NewDeaths: number,
        TotalDeaths: number,
        NewRecovered: number,
        TotalRecovered: number,
    },
    Date: string
}

export function numberWithSpaces(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

const Content: React.FC<{ navigation: any}> = ({ navigation }) => {

    const [data, setData] = useState <SummaryData>()
    const [loading, setLoading] = useState(false)

    var date = new Date().getDate() as unknown as string

    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        setLoading(true)
        fetch("https://api.covid19api.com/summary", requestOptions)
            .then(response => response.json())
            .then(result => { setData(result); setLoading(false)})
            .catch(error => Alert.alert("Error while fetching data!" + error))
    }, [])

    return(
        <View>
            <View style={styles.root}>
                <Text style={styles.title}>COVID-19 Daily update</Text>
                {data && (
                    <>
                        <ContentBlock text="Daily New Cases" data={numberWithSpaces(data?.Global.NewConfirmed)} icon={virus} />
                        <ContentBlock text="Daily New Deaths" data={numberWithSpaces(data?.Global.NewDeaths)} icon={death} secondary inverted />
                        <ContentBlock text="Daily New Recovered" data={numberWithSpaces(data?.Global.NewRecovered)} icon={mask} />
                    </>
                )}
            </View>
            <View style={styles.actions}>
                <Button
                    title="Total Cases"
                    onPress={() => {navigation.navigate("TotalCases", {
                        data: data
                    })}}
                />
            </View>
            <Text style={[styles.title, { fontSize: 20, flexGrow: 1 }]}>Last updated {date == data?.Date.slice(8, 10) ? "today" : data?.Date.slice(8, 10)} at {data?.Date.slice(11, 19)}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        flexGrow: 1,
        padding: 20,
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
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginBottom: 20,
    }
});

export default Content