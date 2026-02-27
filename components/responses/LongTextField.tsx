import { Theme, useTheme } from "@/themes/ThemeContext";
import { FC } from "react";
import { StyleSheet } from "react-native";
import { Input } from "../input";

interface Props {
  value: string;
  onChangeText: (text: string) => void;
}

export const LongTextField: FC<Props> = ({ value, onChangeText }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <Input
      multiline
      numberOfLines={6}
      value={value}
      onChangeText={onChangeText}
      style={styles.textarea}
      textAlignVertical="top"
    />
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    textarea: {
      minHeight: 140,
      paddingVertical: theme.spacing.md,
    },
  });
