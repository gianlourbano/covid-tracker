import React, { useCallback, useState } from "react"
import { Alert, Button, RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native"
import { useQuery } from "react-query"
import ContentBlock from "../../components/ContentBlock"
import axios from "axios"
import Section from "../../components/Section/Section"
import Icon from "react-native-vector-icons/FontAwesome5"

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

const Content: React.FC<{navigation: any}> = ({navigation}) => {

    const [refreshing, setRefreshing] = useState(false);

    const { data, isFetching, refetch } = useQuery("covid", async () => {
        let { data }: { data: Array<SummaryData> } = await axios.get("https://covid19-scraper-utterlabs.herokuapp.com/api/data")
        return(data)
    }, {
        refetchOnWindowFocus: "always",
    })

    const createInfoAlert = () =>
        Alert.alert(
            "Info",
            data && `Data has been updated at ${data[0].time}`,
            [
                { text: "OK" }
            ],
            { cancelable: true }
        )

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        refetch().then(() => setRefreshing(false))
    }, []);

    return(
        <View>
            <View style={styles.title}>
                <Text style={[styles.text, styles.header]}>COVID-19</Text>
                <Icon.Button name="info-circle" color="#DD76A2" size={30} backgroundColor="#cdcdd6" onPress={createInfoAlert} />           
            </View>
            <Text style={[styles.text, { backgroundColor: "#cdcdd6", paddingBottom: 5 }]}>Coronavirus pandemic</Text>
            <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                <View style={styles.root}>
                    <ContentBlock text="Total Cases" data={data && data[0].total_cases} icon={virus} loading={isFetching} main/>
                    <ContentBlock text="Total Deaths" data={data && data[0].total_deaths} icon={death} secondary inverted loading={isFetching} main/>
                    <ContentBlock text="Total Recovered" data={data && data[0].total_recovered} icon={mask} loading={isFetching} main/>
                </View>
                <Section color="#cdcdd6">
                    <Text style={styles.text}>Daily</Text>
                    <Button title="History" onPress={() => navigation.navigate("History", {
                        data: data
                    })}/>
                    <View style={{ flexDirection: "row" }}>
                        <ContentBlock text="New Cases" data={data && data[0].new_cases} secondary loading={isFetching} main />
                        <ContentBlock text="New Deaths" data={data && data[0].new_deaths} loading={isFetching} main />
                    </View>
                    <Text style={styles.text}>Active cases</Text>
                    <View style={{ flexDirection: "row" }}>
                        <ContentBlock text="Active Cases" data={data && data[0].active_cases} loading={isFetching} main />
                        <ContentBlock text="Critical active cases" data={data && data[0].critical_active_cases} loading={isFetching} secondary main shrink/>
                    </View>
                </Section>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    title: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#cdcdd6",
    },
    header: {
        flexGrow: 1,
        textAlign: "auto",
        marginLeft: 20,
        marginTop: 5,
    },
    text: {
        color: "#57596F",
        textAlign: "center",
        fontSize: 35,
    },
});

export default Content