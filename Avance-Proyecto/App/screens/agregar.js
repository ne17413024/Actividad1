import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { getDatabase, ref, push } from "firebase/database";
import { auth } from "../utils/firebaseConfig";

export default function Agregar() {
  const [nombreGuia, setNombreGuia] = useState("");

  const [preguntas, setPreguntas] = useState([
    {
      pregunta: "",
      a: "",
      b: "",
      c: "",
      correcta: "",
      open: false,
    },
  ]);

  const agregarPregunta = () => {
    setPreguntas([
      ...preguntas,
      {
        pregunta: "",
        a: "",
        b: "",
        c: "",
        correcta: "",
        open: false,
      },
    ]);
  };

  const actualizarPregunta = (index, campo, valor) => {
    const copia = [...preguntas];
    copia[index][campo] = valor;
    setPreguntas(copia);
  };

  const subirGuia = async () => {
    if (!auth.currentUser) {
      Alert.alert("Error", "Usuario no autenticado");
      return;
    }

    if (!nombreGuia.trim()) {
      Alert.alert("Error", "Escribe el nombre de la guía");
      return;
    }

    for (let p of preguntas) {
      if (!p.pregunta || !p.a || !p.b || !p.c || !p.correcta) {
        Alert.alert("Error", "Completa todas las preguntas");
        return;
      }
    }

    const db = getDatabase();
    const guiasRef = ref(db, "guias");

    const nuevaGuia = {
      nombre: nombreGuia,
      user: auth.currentUser.uid,
      creadaEn: Date.now(),
      preguntas: preguntas.map(({ open, ...rest }) => rest),
    };

    try {
      await push(guiasRef, nuevaGuia);
      Alert.alert("✅ Éxito", "Guía subida correctamente");

      setNombreGuia("");
      setPreguntas([
        {
          pregunta: "",
          a: "",
          b: "",
          c: "",
          correcta: "",
          open: false,
        },
      ]);
    } catch (error) {
      console.log(error);
      Alert.alert("❌ Error", "No se pudo subir la guía");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* NOMBRE GUIA */}
      <TextInput
        style={styles.inputNombre}
        placeholder="Nombre de la guía"
        placeholderTextColor="#94A3B8"
        value={nombreGuia}
        onChangeText={setNombreGuia}
      />

      {preguntas.map((item, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.subtitulo}>Pregunta {index + 1}</Text>

          <TextInput
            placeholder="Escribe la pregunta"
            placeholderTextColor="#94A3B8"
            style={styles.input}
            value={item.pregunta}
            onChangeText={(text) =>
              actualizarPregunta(index, "pregunta", text)
            }
          />

          <TextInput
            placeholder="Respuesta A"
            placeholderTextColor="#94A3B8"
            style={styles.input}
            value={item.a}
            onChangeText={(text) =>
              actualizarPregunta(index, "a", text)
            }
          />

          <TextInput
            placeholder="Respuesta B"
            placeholderTextColor="#94A3B8"
            style={styles.input}
            value={item.b}
            onChangeText={(text) =>
              actualizarPregunta(index, "b", text)
            }
          />

          <TextInput
            placeholder="Respuesta C"
            placeholderTextColor="#94A3B8"
            style={styles.input}
            value={item.c}
            onChangeText={(text) =>
              actualizarPregunta(index, "c", text)
            }
          />

          {/* DROPDOWN */}
          <View style={{ zIndex: 1000 - index }}>
            <DropDownPicker
              open={item.open}
              value={item.correcta}
              items={[
                { label: "Respuesta A", value: "a" },
                { label: "Respuesta B", value: "b" },
                { label: "Respuesta C", value: "c" },
              ]}
              setOpen={(open) =>
                actualizarPregunta(index, "open", open)
              }
              setValue={(callback) =>
                actualizarPregunta(
                  index,
                  "correcta",
                  callback(item.correcta)
                )
              }
              placeholder="Selecciona la respuesta correcta"
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
              textStyle={{ color: "#fff", fontWeight: "600" }}
              placeholderStyle={{ color: "#94A3B8" }}
              listItemLabelStyle={{ color: "#fff" }}
              theme="DARK"
            />
          </View>
        </View>
      ))}

      <TouchableOpacity style={styles.botonAgregar} onPress={agregarPregunta}>
        <Text style={styles.textoBoton}>➕ Agregar pregunta</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botonSubir} onPress={subirGuia}>
        <Text style={styles.textoBoton}>📤 Subir guía</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

/* ================== STYLES ================== */

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#0F172A",
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#38BDF8",
    textAlign: "center",
    marginBottom: 24,
  },
  inputNombre: {
    backgroundColor: "#1E293B",
    color: "#fff",
    padding: 18,
    borderRadius: 14,
    fontSize: 18,
    marginBottom: 24,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#020617",
    padding: 16,
    borderRadius: 18,
    marginBottom: 20,
  },
  subtitulo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 12,
  },
  input: {
    backgroundColor: "#1E293B",
    color: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    fontSize: 15,
  },
  dropdown: {
    backgroundColor: "#1E293B",
    borderColor: "#1E293B",
    borderRadius: 12,
    marginTop: 8,
  },
  dropdownContainer: {
    backgroundColor: "#020617",
    borderColor: "#1E293B",
    borderRadius: 12,
  },
  botonAgregar: {
    backgroundColor: "#22C55E",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 14,
  },
  botonSubir: {
    backgroundColor: "#38BDF8",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 40,
  },
  textoBoton: {
    color: "#020617",
    fontWeight: "bold",
    fontSize: 16,
  },
});
