import React, { useEffect, useState } from "react"
import { Alert, Image, ImageBackground, StyleSheet, Text, View } from "react-native"
import ContentBlock from "./ContentBlock"

const virus = require("../assets/virus.png")
const death = require("../assets/death.png")
const mask = require("../assets/mask.png")

interface SummaryData {
    Global: {
        NewConfirmed: number,
        TotalConfirmed: number,
        NewDeaths: number,
        TotalDeaths: number,
        NewRecovered: number,
        TotalRecovered: number
    }
}

const Content = () => {

    const [data, setData] = useState <SummaryData>()
    const [loading, setLoading] = useState(false)

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
        <View style={styles.root}>
            <Text style={styles.title}>COVID-19 Daily update</Text>
            <ContentBlock text="Daily New Cases" data={data?.Global.NewConfirmed} icon={virus}/>
            <ContentBlock text="Daily New Deaths" data={data?.Global.NewDeaths} icon={death} secondary inverted/>
            <ContentBlock text="Daily New Recovered" data={data?.Global.NewRecovered} icon={mask} />
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        flexGrow: 1,
        padding: 20,
        display: "flex",
        alignItems: "stretch",
        marginBottom: 50,
    },
    title: {
        color: "#57596F",
        textAlign: "center",
        fontSize: 35
    },
});

export default Content