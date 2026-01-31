import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import settings from "../screens/settings";
import settingsDetail from "../screens/settingsDetail";

const Stack = createNativeStackNavigator();

export default function homeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ajustes" component={settings} />
      <Stack.Screen name="detail" component={settingsDetail} />
    </Stack.Navigator>
  );
}
