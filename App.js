import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import WheatherInfo from "./components/WheatherInfo";

const WEATHER_API_KEI = 'b00922c9b2c28c77cdcd40afb0ba7f0d';
const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?';

//api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

export default function App() {

  const initialWeather = {
    "coord": {"lon": 0,"lat": 0},
    "weather": [
      {"id": 0,"main": "","description": "","icon": "003"}
    ],
    "base": "",
    "main": {
      "temp": 0,
      "feels_like": 0,
      "temp_min": 0,
      "temp_max": 0,
      "pressure": 0,
      "humidity": 0
    },
    "visibility": 0,
    "wind": {
      "speed": 0,
      "deg": 0
    },
    "clouds": {
      "all": 0
    },
    "dt": 0,
    "sys": {
      "type": 0,
      "id": 0,
      "country": "",
      "sunrise": 0,
      "sunset": 0
    },
    "timezone": 0,
    "id": 0,
    "name": "",
    "cod": 0
  }
  const [temp, setTemp] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(initialWeather);

  useEffect(() => {
    load()
  }, []);

  async function load() {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      setErrorMessage('Access to location is needed to run the app');
      return
    } else {
      console.log('Permission ok');
    }

    const location = await Location.getCurrentPositionAsync();
    const { latitude, longitude } = location.coords;
    const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=metric&appid=${WEATHER_API_KEI}`;

    //const response = await fetch(weatherUrl);
    fetch(weatherUrl).then(function (response) {
      if (response.ok) {
        response.json().then(function (result) {
          setCurrentWeather(result);
          setTemp(result.main.temp);
          console.log(result);
        });
      } else {
        setErrorMessage(response.message)
      }
    })
      .catch(function (error) {
        setErrorMessage(error.message);
      });

  }
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <StatusBar style="auto" />
        <WheatherInfo currentWeather={currentWeather}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  main: {
    flex: 1,
    backgroundColor: '#1f3b58',
    justifyContent: 'center',
  },
});
