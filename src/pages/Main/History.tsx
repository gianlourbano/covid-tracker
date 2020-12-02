import React, { useState } from "react"
import { View, Dimensions, StyleSheet, ScrollView } from "react-native"

import ContentBlock from "../../components/ContentBlock"
import { LineChart } from "react-native-chart-kit";
import Section from "../../components/Section/Section";
import { Button } from 'react-native-elements'
import { SummaryData } from "./Content";

const virus = require("../../assets/virus.png")
const death = require("../../assets/death.png")

export const removeCommas = (string: string) => parseFloat(string.replace(/, /g, ""))

const History: React.FC<{route: any}> = ({route}) => {

    const { data } = route.params

    const chartData = {
        labels: ["2 Days Ago", "Yesterday", "Today"],
        datasets: [
            {
                data: [
                    removeCommas(data[2].new_cases),
                    removeCommas(data[1].new_cases),
                    removeCommas(data[0].new_cases),
                ]
            }
        ]
    }

    return(
        <ScrollView>
            <LineChart
                data={chartData}
                width={Dimensions.get("window").width - 30} // from react-native
                height={220}
                yAxisLabel=""
                yAxisSuffix="k"
                chartConfig={{
                    backgroundGradientFrom: "#7884BF",
                    backgroundGradientTo: "#7884BF",
                    decimalPlaces: 0, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16,
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "3",
                        stroke: "#DD76A2"
                    }
                }}
                fromZero
                style={{
                    marginVertical: 15,
                    borderRadius: 20,
                    alignSelf: "center"
                }}
            />
            <Buttons data={data}/>
        </ScrollView>
    )
}

type Selector = 0 | 1 | 2

const Buttons: React.FC<{data: Array<SummaryData>}> = ({data}) => {
    
    const [selected, setSelected] = useState<Selector>(0)
    
    return(
        <View>
            <View style={styles.buttons}>
                <Button title="Today" onPress={() => { setSelected(0) }} buttonStyle={selected == 0 ? styles.buttonSelected : styles.button} />
                <Button title="Yesterday" onPress={() => { setSelected(1) }} buttonStyle={selected == 1 ? styles.buttonSelected : styles.button}/>
                <Button title="2 Days Ago" onPress={() => { setSelected(2) }} buttonStyle={selected == 2 ? styles.buttonSelected : styles.button}/>
            </View>
            <Section color="#cdcdd6">
                <View>
                    <ContentBlock text="Total Cases" data={data && data[selected].total_cases} noAnim inverted icon={virus}/>
                    <ContentBlock text="Total Deaths" data={data && data[selected].total_deaths} secondary noAnim icon={death}/>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <ContentBlock text="New Cases" data={data && data[selected].new_cases} secondary noAnim />
                    <ContentBlock text="New Deaths" data={data && data[selected].new_deaths} noAnim />
                </View>
            </Section>
        </View>
    )
}

const styles = StyleSheet.create({
    buttons: {
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    button: {
        borderRadius: 20
    },
    buttonSelected: {
        backgroundColor: "#DD76A2",
        borderRadius: 20,
    }
})

export default History