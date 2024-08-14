import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    setIsCameraActive(false); // Desactiva la cámara después de escanear
  };

  const renderCamera = () => {
    return (
      <View style={styles.cameraContainer}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.camera}
        />
      </View>
    );
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>Camera permission not granted</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isCameraActive && renderCamera()}
      <Button
        title="Escanear QR"
        onPress={() => setScanned(false)}
        disabled={scanned}
      />
      {!isCameraActive && (
        <Button title="Capturar QR" onPress={() => setIsCameraActive(true)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cameraContainer: {
    width: "90%",
    height: "50%",
    aspectRatio: 1.5,
    overflow: "hidden",
    borderRadius: 10,
  },
  camera: {
    flex: 1,
  },
});
