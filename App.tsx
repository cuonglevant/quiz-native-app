import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "./screens";
import { NavigationProps } from "./utils/interface";
import { ContextProvider } from "./contexts";

const Stack = createNativeStackNavigator<NavigationProps>();

export default function App() {
  return (
    <ContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{
              headerShown: false,
              headerShadowVisible: false,
            }}
            name="Home"
            component={HomeScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ContextProvider>
  );
}
