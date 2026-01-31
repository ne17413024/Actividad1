import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import Home from "../screens/home";
import Profile from "../screens/profile";
import agregar from "../screens/agregar";
import homeStack from "./homeStack";
import settingStack from "./settingStack";

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator
  screenOptions={({ route }) => ({
    headerShown: false,

    tabBarStyle: {
      backgroundColor: "#000000",
      borderTopWidth: 1,
      borderTopColor: "#FFFFFF",
      height: 64,
    },

    tabBarLabelStyle: {
      fontSize: 12,
      fontWeight: "600",
      marginBottom: 6,
    },

    tabBarIcon: ({ focused, color, size }) => {
      let iconName;

      if (route.name === "Home") {
        iconName = focused ? "home" : "home-outline";
      } else if (route.name === "Agregar") {
        iconName = "add-circle-outline";
      } else if (route.name === "Setting") {
        iconName = "settings-outline";
      }

      return <Ionicons name={iconName} size={22} color={color} />;
    },

    tabBarActiveTintColor: "#FFFFFF",
    tabBarInactiveTintColor: "#6B7280",
  })}
>

      <Tab.Screen name="Home" component={homeStack} />
      <Tab.Screen name="Setting" component={settingStack} />
      <Tab.Screen name="Agregar" component={agregar} />
    </Tab.Navigator>
  );
}
