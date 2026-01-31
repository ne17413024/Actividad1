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
    backgroundColor: "#000000",
    padding: 24,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 24,
    letterSpacing: 1,
  },

  card: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#FFFFFF",
    padding: 18,
    borderRadius: 18,
    marginBottom: 22,
  },

  question: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 16,
    lineHeight: 22,
  },

  option: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    marginBottom: 12,
  },

  optionText: {
    color: "#000000",
    fontSize: 15,
    fontWeight: "700",
  },
});
