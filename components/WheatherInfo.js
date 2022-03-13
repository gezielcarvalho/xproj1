import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

export default function WheatherInfo({ currentWeather }) {
    const {
        main: { temp },
        weather: [details],
        name
    } = currentWeather;
    const { icon } = details;
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;

    return (
        <View style={styles.weatherinfo}>
            <Text>{name}</Text>
            <Image source={{ uri: iconUrl }} style={styles.weathericon} />
            <Text>The temperature is {temp} °C</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    weatherinfo: {
        alignItems: 'center'
    },
    weathericon: {
        width: 100,
        height: 100
    }
})