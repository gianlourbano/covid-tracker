import React from "react"
import { View } from "react-native"

const virus = require("../../assets/virus.png")
const death = require("../../assets/death.png")
const mask = require("../../assets/mask.png")

import ContentBlock from "../../components/ContentBlock"

const Daily: React.FC<{ route: any }> = ({ route }) => {

    const { data } = route.params

    return (
        <View>
            <ContentBlock text="New Cases" data={data[0].new_cases} inverted secondary icon={virus} />
            <ContentBlock text="New Deaths" data={data[0].new_deaths} icon={death} />
        </View>
    )
}

export default Daily