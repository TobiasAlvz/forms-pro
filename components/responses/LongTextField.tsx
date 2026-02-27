import { useTheme } from "@/themes/ThemeContext";
import { FC, useState } from "react";
import { StyleSheet } from "react-native";
import { Input } from "../input";

interface Props {
  defaultValue?: string;
  onCommit: (value: string) => void;
}

export const LongTextField: FC<Props> = ({ defaultValue = "", onCommit }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [text, setText] = useState(defaultValue);

  return (
    <Input
      multiline
      numberOfLines={6}
      defaultValue={defaultValue}
      onChangeText={setText}
      onBlur={() => onCommit(text)}
      style={styles.textarea}
      textAlignVertical="top"
    />
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    textarea: {
      minHeight: 140,
      paddingVertical: theme.spacing.md,
    },
  });