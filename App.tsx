import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import MainScreen from "./src/screens/MainScreen";
import PostScreen from "./src/screens/PostScreen";
import QRCodeList from "./src/screens/QRCodeList";
import QRCodeScanner from "react-native-qrcode-scanner";
import QRScanner from "./src/screens/QRScanner";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name='Main' component={MainScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Post" component={PostScreen} />
        <Stack.Screen name="QrList" component={QRCodeList} />
        <Stack.Screen name="QrScanner" component={QRScanner} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
