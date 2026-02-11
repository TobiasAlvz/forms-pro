import { Stack } from "expo-router";
import { ThemeProvider } from "@/themes/ThemeContext";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="singup" options={{ title: "Cadastrar Cliente" }} />
        <Stack.Screen name="confirm-email" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
