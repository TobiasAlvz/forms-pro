import { useTheme } from "@/themes/ThemeContext";
import { FC, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  defaultValue?: string;
  options: string[];
  onCommit: (option: string) => void;
}

const SingleOptionField: FC<Props> = ({
  defaultValue = "",
  options,
  onCommit,
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [selected, setSelected] = useState(defaultValue);

  const handleSelect = (option: string) => {
    setSelected(option);
    onCommit(option);
  };

  return (
    <View style={styles.container}>
      {options.map((option) => {
        const isSelected = selected === option;

        return (
          <Pressable
            key={option}
            onPress={() => handleSelect(option)}
            style={({ pressed }) => [
              styles.option,
              isSelected && styles.optionSelected,
              pressed && styles.pressed,
            ]}
          >
            <View
              style={[
                styles.radioOuter,
                isSelected && styles.radioOuterSelected,
              ]}
            >
              {isSelected && <View style={styles.radioInner} />}
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

export default SingleOptionField;

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
      backgroundColor: theme.colors.primary + "12",
    },

    pressed: {
      opacity: 0.6,
    },

    radioOuter: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: theme.colors.border,
      marginRight: 12,
      justifyContent: "center",
      alignItems: "center",
    },

    radioOuterSelected: {
      borderColor: theme.colors.primary,
    },

    radioInner: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: theme.colors.primary,
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