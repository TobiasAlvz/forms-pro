import { Stack } from "expo-router";
import { ThemeProvider } from "@/themes/ThemeContext";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack />
    </ThemeProvider>
  );
}
