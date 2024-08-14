import React, { useState, useRef } from "react";
import { View, TextInput, Button, StyleSheet, Alert, Image } from "react-native";
import QRCodeSVG from 'react-native-qrcode-svg';
import { captureRef } from 'react-native-view-shot';

export default function PostScreen() {
  const [chasis, setChasis] = useState("");
  const [codigoQr, setCodigoQr] = useState("");
  const qrRef = useRef();

  // Datos adicionales para el QR
  const vehicleData = {
    make: "Subaru",
    model: "Impreza",
    year: 2024,
    color: "Red",
    engine: "2.0L",
    transmission: "Manual",
  };

  const handleGenerateQRCode = () => {
    try {
      // Incluir datos del vehículo junto con el número de chasis
      const data = {
        chasis: chasis,
        ...vehicleData,
      };
      
      setCodigoQr(JSON.stringify(data));
    } catch (error) {
      Alert.alert("Error", `Hubo un problema al generar el QR: ${error.message || 'Error desconocido'}`);
    }
  };

  const handleSave = async () => {
    try {
      if (qrRef.current) {
        const uri = await captureRef(qrRef.current, {
          format: 'png',
          quality: 1.0,
        });
        
        const response = await fetch(uri);
        const blob = await response.blob();
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = async () => {
          const base64data = reader.result;
          
          const saveResponse = await fetch(
            "https://apprest3.onrender.com/api/automovil",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                chasis: chasis,
                codigo_qr: base64data,
              }),
            }
          );
    
          if (saveResponse.ok) {
            const data = await saveResponse.json();
            Alert.alert("Éxito", "Datos guardados correctamente");
            setChasis("");
            setCodigoQr("");
          } else {
            const errorData = await saveResponse.json();
            Alert.alert("Error", `Hubo un problema al guardar los datos: ${errorData.message || 'Error desconocido'}`);
          }
        };
      }
    } catch (error) {
      Alert.alert("Error", `Hubo un problema al guardar los datos: ${error.message || 'Error desconocido'}`);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Ingrese el número de chasis"
        value={chasis}
        onChangeText={setChasis}
      />
      <Button title="Generar QR" onPress={handleGenerateQRCode} />
      {codigoQr ? (
        <View style={styles.qrContainer} ref={qrRef}>
          <QRCodeSVG
            value={codigoQr}
            size={200}
          />
        </View>
      ) : null}
      <Button title="Guardar" onPress={handleSave} />
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
  qrContainer: {
    alignItems: "center",
    marginTop: 20,
  },
});
