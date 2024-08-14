import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, ScrollView, Text, Alert } from "react-native";

const QRCodeList = () => {
  const [qrCodes, setQrCodes] = useState([]);

  useEffect(() => {
    const fetchQrCodes = async () => {
      try {
        const response = await fetch("https://apprest3.onrender.com/api/automovil"); // Ajusta la URL según tu endpoint
        if (response.ok) {
          const data = await response.json();
          setQrCodes(data); // Asegúrate de ajustar esto según la estructura real de tu respuesta
        } else {
          Alert.alert("Error", "No se pudieron obtener los códigos QR.");
        }
      } catch (error) {
        Alert.alert("Error", `Hubo un problema al obtener los datos: ${error.message || 'Error desconocido'}`);
      }
    };

    fetchQrCodes();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {qrCodes.length > 0 ? (
        qrCodes.map((item) => (
          <View key={item.id} style={styles.qrContainer}>
            <Text style={styles.text}>ID: {item.id}</Text>
            <Text style={styles.text}>Chasis: {item.chasis}</Text>
            <Image
              source={{ uri: item.codigo_qr }} // Usa el Base64 directamente en la URI
              style={styles.qrCode}
            />
          </View>
        ))
      ) : (
        <Text style={styles.noDataText}>No hay códigos QR disponibles.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  qrContainer: {
    marginBottom: 30,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 20,
    width: "100%",
  },
  qrCode: {
    width: 150,
    height: 150,
    marginTop: 10,
  },
  text: {
    fontSize: 18,
    textAlign: "center",
  },
  noDataText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
});

export default QRCodeList;
