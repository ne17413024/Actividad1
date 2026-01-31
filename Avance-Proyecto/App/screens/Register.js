import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebaseConfig";

export default function Register({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
  if (!email || !password || !confirmPassword) {
    Alert.alert("Error", "Completa todos los campos");
    return;
  }

  if (password !== confirmPassword) {
    Alert.alert("Error", "Las contraseñas no coinciden");
    return;
  }

  try {
    setLoading(true);

    const response = await fetch("https://2dd50ee9fc1b.ngrok-free.app/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      Alert.alert("Error", data.detail || "Error al registrar");
      return;
    }

    Alert.alert("Cuenta creada", data.message);
    navigation.goBack();

  } catch (error) {
    Alert.alert("Error", "No se pudo conectar al servidor");
  } finally {
    setLoading(false);
  }
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear cuenta ✨</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        placeholderTextColor="#999"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirmar contraseña"
        placeholderTextColor="#999"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity
        style={styles.registerButton}
        onPress={handleRegister}
        disabled={loading}
      >
        <Text style={styles.registerText}>
          {loading ? "Creando..." : "Crear cuenta"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.link}>Volver al login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    padding: 28,
    justifyContent: "center",
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 32,
    letterSpacing: 1,
  },

  input: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#FFFFFF",
    color: "#FFFFFF",
    padding: 16,
    borderRadius: 14,
    marginBottom: 18,
    fontSize: 16,
  },

  registerButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 22,
  },

  registerText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },

  link: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "600",
    opacity: 0.8,
  },
});
