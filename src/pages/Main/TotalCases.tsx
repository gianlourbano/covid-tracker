import React from "react"
import { View } from "react-native"

const virus = require("../../assets/virus.png")
const death = require("../../assets/death.png")
const mask = require("../../assets/mask.png")

import { numberWithSpaces } from "./Content"

import ContentBlock from "../../components/ContentBlock"

const TotalCases: React.FC<{route: any}> = ({ route }) => {

    const { data } = route.params

    return(
        <View>
            <ContentBlock text="Total Confirmed Cases" data={numberWithSpaces(data?.Global.TotalConfirmed)} inverted secondary icon={virus}/>
            <ContentBlock text="Total Confirmed Deaths" data={numberWithSpaces(data?.Global.TotalDeaths)} icon={death}/>
            <ContentBlock text="Total Confirmed Recovered" data={numberWithSpaces(data?.Global.TotalRecovered)} inverted secondary icon={mask}/>
        </View>
    )
}

export default TotalCases