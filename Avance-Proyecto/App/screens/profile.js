import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Profile() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Mi Perfil</Text>
        <Text style={styles.title}> 🏗️ EN CONSTRUCCION</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "85%",
    backgroundColor: "#1A1A1A",
    padding: 24,
    borderRadius: 16,
    alignItems: "center",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    color: "#B3B3B3",
    fontSize: 14,
    textAlign: "center",
  },
});
