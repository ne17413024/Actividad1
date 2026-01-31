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
    backgroundColor: "#0F172A",
    padding: 20,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#1E293B",
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
  },
  guiaNombre: {
    color: "#38BDF8",
    fontSize: 18,
    fontWeight: "bold",
  },
  preguntas: {
    color: "#94A3B8",
    marginTop: 4,
  },
  empty: {
    color: "#94A3B8",
    textAlign: "center",
    marginTop: 40,
  },
});
