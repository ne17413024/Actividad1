import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

export default function Study({ route }) {
  const { guia } = route.params;
  const [respuestas, setRespuestas] = useState({});

  const seleccionar = (index, opcion) => {
    setRespuestas({
      ...respuestas,
      [index]: opcion,
    });
  };

  const getColor = (index, opcion, correcta) => {
  const respuestaUsuario = respuestas[index];

  // Aún no ha respondido
  if (!respuestaUsuario) return "#1E293B";

  // Si eligió la correcta → verde
  if (respuestaUsuario === correcta && opcion === correcta) {
    return "#22C55E"; // verde
  }

  // Si eligió incorrecta
  if (respuestaUsuario !== correcta) {
    // la que eligió → rojo
    if (opcion === respuestaUsuario) {
      return "#EF4444"; // rojo
    }

    // la correcta → amarillo
    if (opcion === correcta) {
      return "#FACC15"; // amarillo
    }
  }

  return "#1E293B";
};


  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{guia.nombre}</Text>

      {guia.preguntas.map((p, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.question}>
            {index + 1}. {p.pregunta}
          </Text>

          {["a", "b", "c"].map((op) => (
            <TouchableOpacity
              key={op}
              style={[
                styles.option,
                {
                  backgroundColor: getColor(
                    index,
                    op,
                    p.correcta
                  ),
                },
              ]}
              onPress={() => seleccionar(index, op)}
              disabled={!!respuestas[index]}
            >
              <Text style={styles.optionText}>
                {op.toUpperCase()}. {p[op]}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    padding: 20,
  },
  title: {
    color: "#38BDF8",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#020617",
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
  },
  question: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },
  option: {
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
  },
  optionText: {
    color: "#020617",
    fontWeight: "bold",
  },
});
