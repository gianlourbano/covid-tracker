import React, { useEffect, useState } from "react"
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native"
import ContentBlock from "../../components/ContentBlock"

const virus = require("../../assets/virus.png")
const death = require("../../assets/death.png")
const mask = require("../../assets/mask.png")
const novirus = require("../../assets/no-virus.png")

import { numberWithSpaces } from "./Content"

interface CountryData {
    Country: string,
    Confirmed: number,
    Deaths: number,
    Recovered: number,
    Active: number,
    Date: string
}

const Country: React.FC = () => {

    const [data, setData] = useState<Array<CountryData>>()

    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("https://api.covid19api.com/dayone/country/italy", requestOptions)
            .then(response => response.json())
            .then(result => {
                result = result.slice(-2)
                setData(result)
            })
            .catch(error => Alert.alert("Error while fetching data!" + error))
    }, [])

    return (
        <View style={styles.root}>
            {data && (
                <ScrollView>
                    <Text style={styles.title}>Italy - IT</Text>
                    <ContentBlock data={numberWithSpaces(data[1].Active)} text="Active Cases" secondary icon={mask} />
                    <ContentBlock data={numberWithSpaces(data[1].Confirmed)} text="Total Confirmed Cases" inverted icon={virus} />
                    <ContentBlock data={numberWithSpaces(data[1].Deaths)} text="Total Deaths" secondary icon={death} />
                    <ContentBlock data={numberWithSpaces(data[1].Recovered)} text="Total Recovered" inverted icon={novirus} />
                    <Text style={styles.title}>Daily</Text>
                    <ContentBlock data={numberWithSpaces(data[1].Active - data[0].Active)} text="New Active Cases" secondary icon={mask} />
                    <ContentBlock data={numberWithSpaces(data[1].Confirmed - data[0].Confirmed)} text="New Confirmed Cases" inverted icon={virus} />
                    <ContentBlock data={numberWithSpaces(data[1].Deaths - data[0].Deaths)} text="New Deaths" secondary icon={death} />
                    <ContentBlock data={numberWithSpaces(data[1].Recovered - data[0].Recovered)} text="New Recovered" inverted icon={novirus} />
                    <Text style={[styles.title, { fontSize: 20 }]}>Last Updaded on {data[1].Date}</Text>
                </ScrollView>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        color: "#57596F",
        textAlign: "center",
        fontSize: 35
    },
    root: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
        display: "flex",
        alignItems: "stretch",
        marginBottom: 60,
    }
})

export default Country