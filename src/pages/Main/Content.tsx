import React, { useCallback, useState } from "react"
import { RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native"
import { useQuery } from "react-query"
import ContentBlock from "../../components/ContentBlock"
import axios from "axios"


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

const Content: React.FC = () => {

    const [refreshing, setRefreshing] = useState(false);

    const { data, isFetching, refetch } = useQuery("covid", async () => {
        let { data }: { data: Array<SummaryData> } = await axios.get("https://covid19-scraper-utterlabs.herokuapp.com/api/data")
        return(data)
    }, {
        refetchOnWindowFocus: "always",
    })

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        refetch().then(() => setRefreshing(false))
    }, []);

    return(
        <View style={{marginBottom: 130}}>
            <Text style={styles.title}>COVID-19 Summary</Text>
            <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                <View style={styles.root}>
                    <ContentBlock text="Total Cases" data={data && data[0].total_cases} icon={virus} loading={isFetching} main/>
                    <ContentBlock text="Total Deaths" data={data && data[0].total_deaths} icon={death} secondary inverted loading={isFetching} main/>
                    <ContentBlock text="Total Recovered" data={data && data[0].total_recovered} icon={mask} loading={isFetching} main/>
                    <ContentBlock text="New Cases" data={data && data[0].new_cases} inverted secondary icon={virus} loading={isFetching} main/>
                    <ContentBlock text="New Deaths" data={data && data[0].new_deaths} icon={death} loading={isFetching} main/>
                </View>
            </ScrollView>
        </View>
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
});

export default Content