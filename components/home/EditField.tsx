import { Field } from "@/services/forms-service";
import { Theme, useTheme } from "@/themes/ThemeContext";
import { FC, useState } from "react";
import { Button } from "../Button";
import { Switch } from "../switch";
import { Input } from "../input";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

interface Props {
  field: Field;
  onSaveField: (fieldId: string, field: Field) => void;
  onMoveUp: (fieldId: string) => void;
  onMoveDown: (fieldId: string) => void;
  onRemove: (fieldId: string) => void;
  onStateChange: (fieldId: string, changes: Partial<Field>) => void;
  isFirst: boolean;
  isLast: boolean;
}

export const FieldCard: FC<Props> = ({
  field,
  onSaveField,
  onStateChange,
  onRemove,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => setExpanded((v) => !v)}
      >
        <Text style={styles.title}>Campo #{field.fieldOrder + 1}</Text>

        <View style={styles.controls}>
          {!isFirst && (
            <TouchableOpacity onPress={() => onMoveUp(field.id)}>
              <Feather name="arrow-up" size={20} color={theme.colors.text} />
            </TouchableOpacity>
          )}

          {!isLast && (
            <TouchableOpacity onPress={() => onMoveDown(field.id)}>
              <Feather name="arrow-down" size={20} color={theme.colors.text} />
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={() => onRemove(field.id)}>
            <Feather name="trash-2" size={20} color={theme.colors.danger} />
          </TouchableOpacity>

          <Feather
            name={expanded ? "chevron-up" : "chevron-down"}
            size={20}
            color={theme.colors.text}
          />
        </View>
      </TouchableOpacity>

      {expanded && (
        <>
          <Input
            placeholder="Rótulo"
            value={field.label}
            onChangeText={(text) => onStateChange(field.id, { label: text })}
            style={styles.label}
          />

          <Input
            placeholder="short_text | long_text | single_option | multiple_option"
            value={field.kind}
            onChangeText={(text) =>
              onStateChange(field.id, { kind: text as Field["kind"] })
            }
            style={styles.label}
          />

          {(field.kind === "single_option" ||
            field.kind === "multiple_option") && (
            <Input
              placeholder="Opções separadas por vírgula"
              value={(field.options ?? []).join(",")}
              onChangeText={(text) =>
                onStateChange(field.id, { options: text.split(",") })
              }
              style={styles.label}
            />
          )}

          <Switch
            label="Obrigatório?"
            value={field.isRequired}
            onValueChange={(value) =>
              onStateChange(field.id, { isRequired: value })
            }
          />

          <Button
            title="Salvar campo"
            onPress={() => onSaveField(field.id, field)}
          />
        </>
      )}
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.radius.md,
      padding: theme.spacing.lg,
      borderWidth: 1,
      borderColor: theme.colors.border,
      elevation: 1,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    title: {
      fontWeight: "bold",
      color: theme.colors.text,
    },
    controls: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.md,
    },
    label: {
      marginVertical: theme.spacing.md,
    },
  });
