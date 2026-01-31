import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { getDatabase, ref, onValue } from "firebase/database";
import { auth } from "../utils/firebaseConfig";

export default function Home({ navigation }) {
  const [guias, setGuias] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const guiasRef = ref(db, "guias");

    onValue(guiasRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) return;

      const uid = auth.currentUser.uid;

      const guiasUsuario = Object.entries(data)
        .filter(([_, guia]) => guia.user === uid)
        .map(([id, guia]) => ({ id, ...guia }));

      setGuias(guiasUsuario);
    });
  }, []);

  return (
    <View style={styles.container}>

      <FlatList
        data={guias}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("study", { guia: item })
            }
          >
            <Text style={styles.guiaNombre}>{item.nombre}</Text>
            <Text style={styles.preguntas}>
              {item.preguntas.length} preguntas
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No tienes guías aún</Text>
        }
      />
    </View>
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
    marginBottom: 18,
    letterSpacing: 1,
  },

  card: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#FFFFFF",
    padding: 18,
    borderRadius: 16,
    marginBottom: 14,
  },

  guiaNombre: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.4,
  },

  preguntas: {
    color: "#BFBFBF",
    marginTop: 6,
    fontSize: 14,
  },

  empty: {
    color: "#BFBFBF",
    textAlign: "center",
    marginTop: 60,
    fontSize: 15,
  },
});
