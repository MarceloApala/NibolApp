import React from "react";
import { Button, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

export default function MainScreen({ navigation }) {
  return (
    <View>
      <Button
        title="Generar QR"
        onPress={() => navigation.navigate('Post')} 
      />
      <Button
        title="Leer QR"
        onPress={() => navigation.navigate("QrScanner")}
      />
      <Button
        title="Lista de QR"
        onPress={() => navigation.navigate("QrList")} 
      />
    </View>
  );
}
