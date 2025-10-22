import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/components/useColorScheme";
import { QuizProvider } from "@/context/QuizContext";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <QuizProvider>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: "#007AFF",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "600",
            },
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              title: "Tech Trivia Quiz",
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="quiz"
            options={{
              title: "Quiz",
              headerShown: true,
              headerBackVisible: false, // Prevent going back
              gestureEnabled: false, // Disable swipe back gesture
            }}
          />
          <Stack.Screen
            name="result"
            options={{
              title: "Results",
              headerShown: true,
              headerBackVisible: false, // Prevent going back
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="review"
            options={{
              title: "Review Answers",
              headerShown: true,
            }}
          />
        </Stack>
      </QuizProvider>
    </ThemeProvider>
  );
}
