import { Stack } from "expo-router";
import { ThemeProvider } from "@/themes/ThemeContext";
import { SessionProvider } from "@/providers/SessionContext";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <SessionProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen
            name="singup"
            options={{ title: "Cadastrar Cliente" }}
          />
          <Stack.Screen name="confirm-email" options={{ headerShown: false }} />
          <Stack.Screen name="home" options={{ title: "Inicio"}} />
        </Stack>
      </SessionProvider>
    </ThemeProvider>
  );
}
