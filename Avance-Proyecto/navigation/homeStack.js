import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/home";
import study from "../screens/study";

const Stack = createNativeStackNavigator();

export default function homeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="inicio" component={Home} />
      <Stack.Screen name="study" component={study} />
    </Stack.Navigator>
  );
}
