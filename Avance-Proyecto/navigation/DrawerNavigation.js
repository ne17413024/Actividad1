import React from "react";
import { Alert, Dimensions  } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebaseConfig";

import TabNavigation from "./TabNavigation";
import ajustes from "../screens/ajustes";
import profile from "../screens/profile";


const Drawer = createDrawerNavigator();
const { width } = Dimensions.get("window");

export default function DrawerNavigation({ navigation }) {
  const handleLogout = () => {
    Alert.alert(
      "Cerrar sesión",
      "¿Estás seguro de que deseas salir?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Salir",
          style: "destructive",
          onPress: async () => { await signOut(auth); navigation.replace("Login"); }

        },
      ]
    );
  };

  return (
    <Drawer.Navigator
      screenOptions={{
        drawerPosition: "right",
        headerShown: true,

        drawerStyle: {
          width: width * 0.7, // 70% de la pantalla
        },

        overlayColor: "rgba(0,0,0,0.3)",
        
      }}
    >
      <Drawer.Screen
        name="Tabs"
        component={TabNavigation}
        options={{
          title: "Inicio",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Perfil"
        component={profile}
        options={{
          title: "Perfil",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Ajustes"
        component={ajustes}
        options={{
          title: "ajustes",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="cog-outline" size={size} color={color} />
          ),
        }}
      />

      {/* LOGOUT */}
      <Drawer.Screen
        name="Logout"
        component={() => null}
        options={{
          title: "Cerrar sesión",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="log-out-outline" size={size} color={color} />
          ),
        }}
        listeners={{
          drawerItemPress: (e) => {
            e.preventDefault();
            handleLogout();
          },
        }}
      />
    </Drawer.Navigator>
  );
}
