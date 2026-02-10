import { ScreenContainer } from "@/components/ScreenContainer";
import { Title } from "@/components/Title";
import { Button } from "@/components/Button";
import { Input } from "@/components/input";
import { Theme, useTheme } from "@/themes/ThemeContext";
import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <ScreenContainer>
      <View></View>
    </ScreenContainer>
  );
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    formContainer: {
      flex: 1,
      justifyContent: "center",
    },
    footerText: {
      marginTop: theme.spacing.lg,
      color: theme.colors.secondary,
      textAlign: "center",
    },
    linkText: {
      color: theme.colors.primary,
      fontWeight: "600",
    },
  });
