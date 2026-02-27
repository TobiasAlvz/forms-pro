import { useTheme } from "@/themes/ThemeContext";
import { FC } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  value: string;
  options: string[];
  onSelect: (value: string) => void;
}

const MultipleOptionsField: FC<Props> = ({ value, options, onSelect }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  let selected: string[] = [];
  try {
    selected = JSON.parse(value || "[]");
  } catch {
    selected = [];
  }

  const toggle = (option: string) => {
    const updated = selected.includes(option)
      ? selected.filter((o) => o !== option)
      : [...selected, option];

    onSelect(JSON.stringify(updated));
  };

  return (
    <View style={styles.container}>
      {options.map((option) => {
        const isSelected = selected.includes(option);

        return (
          <Pressable
            key={option}
            onPress={() => toggle(option)}
            style={({ pressed }) => [
              styles.option,
              isSelected && styles.optionSelected,
              pressed && styles.pressed,
            ]}
          >
            <View
              style={[styles.checkBox, isSelected && styles.checkBoxSelected]}
            >
              {isSelected && <Text style={styles.checkMark}>✓</Text>}
            </View>

            <Text style={[styles.label, isSelected && styles.labelSelected]}>
              {option}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default MultipleOptionsField;

/* ================== STYLES ================== */

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      gap: 10,
      marginTop: 6,
    },

    option: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 14,
      paddingHorizontal: 14,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.card,
    },

    optionSelected: {
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.primary + "15", // leve transparência
    },

    pressed: {
      opacity: 0.6,
    },

    checkBox: {
      width: 20,
      height: 20,
      borderRadius: 6,
      borderWidth: 2,
      borderColor: theme.colors.border,
      marginRight: 12,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "transparent",
    },

    checkBoxSelected: {
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.primary,
    },

    checkMark: {
      color: "#fff",
      fontSize: 14,
      fontWeight: "bold",
    },

    label: {
      flex: 1,
      fontSize: 15,
      color: theme.colors.text,
    },

    labelSelected: {
      color: theme.colors.primary,
      fontWeight: "600",
    },
  });
