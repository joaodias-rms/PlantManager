import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Welcome } from "../screens/welcome";
import { UserIdentification } from "../screens/UserIdentification";
import { Confirmation } from "../screens/Confirmation";
import { PlantSave } from "../screens/PlantSave";

import AuthRoutes from "./tab.routes";

import colors from "../styles/colors";

const stackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => (
  <stackRoutes.Navigator
    screenOptions={{
      cardStyle: {
        backgroundColor: colors.white,
      },
    }}
  >
    <stackRoutes.Screen
      name="Welcome"
      component={Welcome}
      options={{ headerShown: false }}
    />
    <stackRoutes.Screen
      name="UserIdentification"
      component={UserIdentification}
      options={{ headerShown: false }}
    />
    <stackRoutes.Screen
      name="Confirmation"
      component={Confirmation}
      options={{ headerShown: false }}
    />
    <stackRoutes.Screen
      name="PlantSelect"
      component={AuthRoutes}
      options={{ headerShown: false }}
    />
    <stackRoutes.Screen
      name="PlantSave"
      component={PlantSave}
      options={{ headerShown: false }}
    />
    <stackRoutes.Screen
      name="MyPlants"
      component={AuthRoutes}
      options={{ headerShown: false }}
    />
  </stackRoutes.Navigator>
);

export default AppRoutes;
