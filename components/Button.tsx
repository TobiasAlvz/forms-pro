import { Theme, useTheme } from "@/themes/ThemeContext";
import { FC } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

interface Props {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  loading?: boolean;
  disabled?: boolean;
  variant?: "primary" | "outline" | "danger" | "success";
}

export const Button: FC<Props> = ({
  onPress,
  title,
  disabled,
  loading,
  style,
  textStyle,
  variant = "primary",
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const variantStyles = {
    primary: {
      backgroundColor: theme.colors.primary,
    },
    outline: {
      borderColor: theme.colors.primary,
      borderWidth: 2,
      backgroundColor: "transparent",
    },
    success: {
      backgroundColor: theme.colors.success,
    },
    danger: {
      backgroundColor: theme.colors.danger,
    },
  };

  const textColor =
    variant === "outline" ? theme.colors.primary : theme.colors.onPrimary;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, variantStyles[variant], style]}
    >
      {loading && <ActivityIndicator color={textColor} />}
      {!loading && (
        <Text style={[styles.text, { color: textColor }, textStyle]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    button: {
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.lg,
      borderRadius: theme.radius.md,
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      color: theme.colors.onPrimary,
      fontSize: theme.fontSizes.md,
      fontWeight: "600",
    },
  });
