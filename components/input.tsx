import { Theme, useTheme } from "@/themes/ThemeContext";
import { FC } from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

export const Input: FC<TextInputProps> = (props) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <TextInput
      placeholderTextColor={theme.colors.disabled}
      style={[styles.input, props.style]}
      {...props}
    />
  )
}

const createStyles = (theme: Theme) => StyleSheet.create({
  input: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: theme.radius.md,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    fontSize: theme.fontSizes.md,
    color: theme.colors.text,
  },
});