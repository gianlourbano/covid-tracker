import React, { useState } from "react"
import { ActivityIndicator, StyleSheet, Text, View, ScrollView } from "react-native"
import { Button, Input, Overlay } from "react-native-elements"
import { useQuery } from "react-query"
import axios from "axios"
import ContentBlock from "../../components/ContentBlock"
import { numberWithSpaces } from "../Main/Content"


const virus = require("../../assets/virus.png")
const death = require("../../assets/death.png")
const mask = require("../../assets/mask.png")
const novirus = require("../../assets/no-virus.png")

interface Response {
  Country: string,
  Confirmed: number,
  Deaths: number,
  Recovered: number,
  Active: number,
  Date: string

}

const World: React.FC = () => {

  const [text, setText] = useState("")

  const { data, isFetching, isError, refetch } = useQuery(["world", text], async () => {
    let { data }: { data: Array<Response> } = await axios.get(`https://api.covid19api.com/total/dayone/country/${text}`)
    data = data.slice(-2)
    return (data)
  }, {
    refetchOnWindowFocus: false,
    enabled: false
  })

  const onSubmit = (e: any) => {
    e.preventDefault()
    refetch()
  }

  const handleError = () => {
    setText("")
  }

  return (
    <View style={styles.root}>
      <Text style={styles.text}>World Info</Text>
      <Input
        value={text}
        onChangeText={text => setText(text)}
        onSubmitEditing={onSubmit}
        placeholder='Search for Country'
        rightIcon={{ type: "font-awesome-5", name: 'search' }}
      />
      <ActivityIndicator size="large" animating={isFetching} />
      <Overlay isVisible={isError}
        onBackdropPress={() => { }}
        overlayStyle={styles.overlay}
        animationType="fade"
      >
        <>
          <Text>Error!</Text>
          <Text>This might be a problem with the server, or you mispelled country name</Text>
          <Button onPress={() => handleError()} 
                  title="Exit"
                  containerStyle={{ padding: 10, alignSelf: "flex-end" }} 
                  />
        </>
      </Overlay>
      {data && (
        <ScrollView style={styles.data}>
          <Text style={styles.title}>Summary - {data[1].Country}</Text>
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
  root: {
    paddingHorizontal: 20
  },
  text: {
    color: "#57596F",
    fontSize: 35,
    textAlign: "center"
  },
  title: {
    color: "#57596F",
    textAlign: "center",
    fontSize: 35
  },
  data: {
    flexGrow: 1,
    marginBottom: 170,
  },
  overlay: {
    marginHorizontal: 20,
    padding: 20,
  }
})

export default World