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
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Agregar") {
            iconName = focused ? "add-circle-outline" : "add-circle-outline";
          } else if (route.name === "Setting") {
            iconName = focused ? "settings-outline" : "settings-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#38BDF8",
        tabBarInactiveTintColor: "#94A3B8",
      })}
    >
      <Tab.Screen name="Home" component={homeStack} />
      <Tab.Screen name="Setting" component={settingStack} />
      <Tab.Screen name="Agregar" component={agregar} />
    </Tab.Navigator>
  );
}
