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
          <Stack.Screen name="home" options={{ title: "Inicio" }} />
          <Stack.Screen name="forms/forms" options={{ title: "Formulario" }} />
          <Stack.Screen name="forms/list" options={{ headerShown: false }} />
          <Stack.Screen
            name="forms/edit"
            options={{ title: "Editar Formulario" }}
          />
          <Stack.Screen
            name="preview/[formid]"
            options={{ title: "Previu de formulario" }}
          />
        </Stack>
      </SessionProvider>
    </ThemeProvider>
  );
}
