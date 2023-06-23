import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import SystemNavigator from "./app/navigation/SystemNavigator";
import AuthContext from "./app/auth/context";

export default function App() {

  return (
      <NavigationContainer>
        <SystemNavigator />
      </NavigationContainer>
  );
}
