import { Theme, useTheme } from "@/themes/ThemeContext";
import { FC, ReactNode } from "react";
import { StyleSheet, Text, TextStyle } from "react-native";

interface Props {
  children: ReactNode;
  style?: TextStyle;
  align?: "left" | "center" | "right";
}

export const Title: FC<Props> = ({ children, align, style }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <Text style={[styles.title, { textAlign: align }, style]}>{children}</Text>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    title: {
      fontSize: theme.fontSizes.xl,
      fontWeight: "700",
      color: theme.colors.text,
      marginBottom: theme.spacing.md,
    },
  });
