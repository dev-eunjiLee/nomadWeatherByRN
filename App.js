import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { Fontisto } from "@expo/vector-icons";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const API_KEY = "09062df488493f65510e46700fa97428";

const icons = {
  Clouds: "cloudy",
  Rain: "rains",
  Clear: "day-sunny",
  Atmosphere: "cloudy-gusts",
  Snow: "snow",
  Drizzle: "rain",
  Thunderstorm: "lightning",
};

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);
  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync(); // 앱 사용중에만 위치값을 받음
    if (!granted) {
      // 유저가 권한 요청을 거절
      setOk(false);
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({
      accuracy: 5,
    });
    console.log(latitude, longitude);

    const [{ city }] = await Location.reverseGeocodeAsync(
      {
        latitude,
        longitude,
      },
      { useGoogleMaps: false }
    );

    setCity(city);
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`
    );
    const json = await response.json();
    console.log(json);
    setDays(json.daily);
  };
  useEffect(() => {
    (async () => {
      await getWeather();
    })();
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
        horizontal
        pagingEnabled
        contentContainerStyle={styles.weather}
        showsHorizontalScrollIndicator={false}
      >
        {days.length === 0 ? (
          <View style={{ ...styles.day, marginLeft: 0, alignItems: "center" }}>
            <ActivityIndicator
              color="black"
              size="large"
              style={{ marginTop: 10 }}
            ></ActivityIndicator>
          </View>
        ) : (
          days.map((day, index) => {
            return (
              <View key={index} style={styles.day}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    // justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Text style={styles.temp}>
                    {parseFloat(day.temp.day).toFixed(1)}
                  </Text>
                  {icons[day.weather[0].main] !== undefined ? (
                    <Fontisto
                      name={icons[`${day.weather[0].main}`]}
                      size={40}
                      color="black"
                      marginTop={50}
                    />
                  ) : (
                    <Fontisto name="bug" size={40} color="black" />
                  )}
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.description}>{day.weather[0].main}</Text>
                  <Text style={styles.tinyText}>
                    {day.weather[0].description}
                  </Text>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#edd5d3",
  },
  city: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  cityName: {
    fontSize: 68,
    fontWeight: "500",
    color: "black",
  },
  weather: {},
  day: {
    alignItems: "baseline",
    width: SCREEN_WIDTH,
    color: "black",
    marginLeft: 30,
  },
  temp: { marginTop: 50, fontSize: 100, color: "black", fontWeight: "1000" },
  description: {
    fontSize: 60,
    color: "black",
    fontWeight: "200",
  },
  tinyText: {
    fontSize: 30,
    color: "black",
    fontWeight: "100",
    marginLeft: 20,
  },
});
