import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../screens/login";
import register from "../screens/Register";
import DrawerNavigation from "./DrawerNavigation";

const Stack = createNativeStackNavigator();

export default function RootNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={register} />
      <Stack.Screen name="MainApp" component={DrawerNavigation} />
    </Stack.Navigator>
  );
}
