import { useTheme } from "@/themes/ThemeContext";
import { FC, useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  defaultValue?: string;
  options: string[];
  onCommit: (value: string) => void;
}

const MultipleOptionsField: FC<Props> = ({
  defaultValue = "[]",
  options,
  onCommit,
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  // valor inicial seguro
  const parseValue = (v: string): string[] => {
    try {
      const parsed = JSON.parse(v);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  const [selected, setSelected] = useState<string[]>(parseValue(defaultValue));

  // 🔥 MUITO IMPORTANTE
  // quando muda de pergunta, sincroniza o estado interno
  useEffect(() => {
    setSelected(parseValue(defaultValue));
  }, [defaultValue]);

  const toggle = (option: string) => {
    let updated: string[];

    if (selected.includes(option)) {
      updated = selected.filter((o) => o !== option);
    } else {
      updated = [...selected, option];
    }

    setSelected(updated);
    onCommit(JSON.stringify(updated));
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
      backgroundColor: theme.colors.primary + "15",
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