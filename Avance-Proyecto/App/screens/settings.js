import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function settings() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajustes de guías</Text>
      <Text style={styles.subtitle}>
        Personaliza la guia en que estudias
      </Text>
      <Text style={styles.title}> 🏗️ EN CONSTRUCCION</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "800",
    letterSpacing: 1,
    marginBottom: 8,
  },

  subtitle: {
    color: "#BFBFBF",
    fontSize: 14,
    textAlign: "center",
  },
});
