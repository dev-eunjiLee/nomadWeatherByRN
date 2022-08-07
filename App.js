import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

console.log(SCREEN_WIDTH);

export default function App() {
  console.log("here");
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.city}>
        <Text style={styles.cityName}>Seoul</Text>
      </View>
      <ScrollView
        horizontal
        pagingEnabled
        contentContainerStyle={styles.weather}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.day}>
          <Text style={styles.temp}>27°</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27°</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27°</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27°</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#42a4f5",
  },
  city: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 68,
    fontWeight: "500",
  },
  weather: {},
  day: {
    alignItems: "center",
    width: SCREEN_WIDTH,
  },
  temp: { marginTop: 50, fontSize: 178 },
  description: { marginTop: -30, fontSize: 60 },
});
