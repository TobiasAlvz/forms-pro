import { FieldKind } from "@/services/forms-service";
import { Theme, useTheme } from "@/themes/ThemeContext";
import { FC } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

interface Props {
  value: FieldKind;
  onChange: (value: FieldKind) => void;
}

export const FieldKindPicker: FC<Props> = ({ value, onChange }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tipo de Campo</Text>

      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={value}
          onValueChange={(v) => onChange(String(v) as FieldKind)}
          style={styles.picker}
          dropdownIconColor={theme.colors.text} // corrige no Android dark
        >
          <Picker.Item label="Texto Curto" value="short_text" />
          <Picker.Item label="Texto Longo" value="long_text" />
          <Picker.Item label="Opção única" value="single_option" />
          <Picker.Item label="Múltiplas opções" value="multiple_option" />
        </Picker>
      </View>
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      width: "100%",
      gap: 6,
    },

    label: {
      fontSize: 14,
      color: theme.colors.text,
      fontWeight: "600",
    },

    pickerWrapper: {
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: 10,
      overflow: "hidden",
    },

    picker: {
      width: "100%",
      color: theme.colors.text,
    },
  });
