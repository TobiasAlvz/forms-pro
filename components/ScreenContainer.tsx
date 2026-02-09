import { Stack } from "expo-router";
import { FC, ReactNode } from "react";
import { StatusBar, StyleSheet, View, ViewStyle } from "react-native";

import { useTheme } from "@/themes/ThemeContext";
import type { Theme } from "@/themes/ThemeContext";

interface Props {
  children: ReactNode;
  style?: ViewStyle;
}

export const ScreenContainer: FC<Props> = ({ children, style }) => {
  const { theme, currentTheme } = useTheme();
  const styles = createStyles(theme);

  return (
    <>
      <StatusBar
        barStyle={currentTheme === "light" ? "dark-content" : "light-content"}
      />

      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: theme.colors.surface },
          headerTintColor: theme.colors.text,
        }}
      />

      <View style={[styles.container, style]}>{children}</View>
    </>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.xl,
      backgroundColor: theme.colors.background,
    },
  });
