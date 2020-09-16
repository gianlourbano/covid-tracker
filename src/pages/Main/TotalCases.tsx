import React, { useState } from "react"
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
            <ContentBlock text="Mild Condition Active Cases" data={numberWithSpaces(data.data.mild_condition_active_cases)} inverted secondary icon={mask}/>
            <ContentBlock text="Critical Condition Active Cases" data={numberWithSpaces(data.data.critical_condition_active_cases)} icon={virus}/>
            <ContentBlock text="General Death Rate" data={numberWithSpaces(data.data.general_death_rate)} inverted secondary icon={death}/>
        </View>
    )
}

export default TotalCases