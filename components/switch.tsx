import { Theme, useTheme } from "@/themes/ThemeContext";
import { FC } from "react";
import { Switch as RNSwitch, StyleSheet, Text, View } from "react-native";

interface Props {
  label: string;
  value: boolean;
  onValueChange: (newValue: boolean) => void;
}

export const Switch: FC<Props> = ({ label, value, onValueChange }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <RNSwitch
        value={value}
        onValueChange={onValueChange}
        thumbColor={value ? theme.colors.primary : "#f4f3f4"}
        trackColor={{ true: theme.colors.primary + "66", false: "#cccccc" }}
      />
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: theme.spacing.sm,
    },
    label: {
      fontSize: theme.fontSizes.md,
      color: theme.colors.text,
    },
  });
