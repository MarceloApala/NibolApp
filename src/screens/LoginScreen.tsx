import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const validUsername = "nibol";
    const validPassword = "Temporal123";

    if (username === validUsername && password === validPassword) {
      Alert.alert("Éxito", "Has iniciado sesión correctamente");
      // Navegar a MainScreen
      navigation.navigate("Main");
    } else {
      Alert.alert("Error", "Usuario o contraseña incorrectos");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Usuario"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button
        title="Iniciar sesión"
        onPress={handleLogin}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
