import { ThemeProvider } from "@/themes/ThemeContext";
import { Stack } from "expo-router";

// https://complex-humor-1df.notion.site/302cc8c2db9680e7be47cdd21ae9bff3

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack />
    </ThemeProvider>
  );
}