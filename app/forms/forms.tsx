import { Button } from "@/components/Button";
import { FieldCard } from "@/components/home/EditField";
import { Input } from "@/components/input";
import { ScreenContainer } from "@/components/ScreenContainer";
import { Switch } from "@/components/switch";
import { Title } from "@/components/Title";
import formsService, { Field } from "@/services/forms-service";
import { Theme, useTheme } from "@/themes/ThemeContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";

export default function EditFormScreen() {
  const { formId } = useLocalSearchParams();
  const router = useRouter();
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [fields, setFields] = useState<Field[]>([]);
  const [loading, setLoading] = useState(true);

  // carregar formulário corretamente (IMPORTANTE)
  useEffect(() => {
    if (!formId || typeof formId !== "string") return;

    const load = async () => {
      const data = await formsService.getFormById(formId);
      if (!data) {
        Alert.alert("Erro", "Formulário não encontrado");
        router.back();
        return;
      }

      setTitle(data.form.title ?? "");
      setDescription(data.form.description ?? "");
      setIsPublished(data.form.isPublished ?? false);
      setFields(data.fields ?? []);
      setLoading(false);
    };

    load();
  }, [formId]);

  const saveForm = async () => {
    if (typeof formId !== "string") return;

    const result = await formsService.updateForm(formId, {
      title,
      description,
      isPublished,
    });

    if (!result) {
      Alert.alert("Erro", "Falha ao salvar");
      return;
    }

    Alert.alert("Sucesso", "Formulário salvo!");
    router.back();
  };

  // criar campo (order seguro)
  const addField = async () => {
    if (typeof formId !== "string") return;

    const nextOrder =
      fields.length > 0 ? Math.max(...fields.map((f) => f.fieldOrder)) + 1 : 0;

    const field = await formsService.addField(formId, nextOrder);
    if (!field) return;

    setFields((current) => [...current, field]);
  };

  const saveField = async (fieldId: string, field: Field) => {
    await formsService.updateField(fieldId, field);
    Alert.alert("Campo salvo");
  };

  const updateFieldsState = (fieldId: string, changes: Partial<Field>) => {
    setFields((current) =>
      current.map((f) => (f.id === fieldId ? { ...f, ...changes } : f)),
    );
  };

  const removeField = async (fieldId: string) => {
    const updated = fields
      .filter((f) => f.id !== fieldId)
      .map((f, index) => ({ ...f, fieldOrder: index }));

    setFields(updated);

    await formsService.removeField(fieldId);

    // salva nova ordem
    for (const f of updated) {
      await formsService.updateField(f.id, { fieldOrder: f.fieldOrder });
    }
  };

  const moveUp = async (fieldId: string) => {
    const index = fields.findIndex((f) => f.id === fieldId);
    if (index <= 0) return;

    const updated = [...fields];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];

    const ordered = updated.map((f, i) => ({ ...f, fieldOrder: i }));
    setFields(ordered);

    for (const f of ordered) {
      await formsService.updateField(f.id, { fieldOrder: f.fieldOrder });
    }
  };

  const moveDown = async (fieldId: string) => {
    const index = fields.findIndex((f) => f.id === fieldId);
    if (index === -1 || index >= fields.length - 1) return;

    const updated = [...fields];
    [updated[index + 1], updated[index]] = [updated[index], updated[index + 1]];

    const ordered = updated.map((f, i) => ({ ...f, fieldOrder: i }));
    setFields(ordered);

    for (const f of ordered) {
      await formsService.updateField(f.id, { fieldOrder: f.fieldOrder });
    }
  };

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={styles.content}>
        <Title>Editando formulário</Title>
        <Text>ID: {formId}</Text>

        <Input placeholder="Título" value={title} onChangeText={setTitle} />
        <Input
          placeholder="Descrição"
          value={description}
          onChangeText={setDescription}
        />

        <View style={styles.switchRow}>
          <Switch
            label="Publicado?"
            value={isPublished}
            onValueChange={setIsPublished}
          />
        </View>

        <Button title="Salvar formulário" onPress={saveForm} />

        <View style={styles.fieldHeader}>
          <Title>Campos</Title>
          <Button
            title="Adicionar campo"
            variant="outline"
            onPress={addField}
          />
        </View>

        {fields.map((field) => (
          <FieldCard
            key={field.id}
            field={field}
            onSaveField={saveField}
            onMoveUp={moveUp}
            onMoveDown={moveDown}
            onRemove={removeField}
            onStateChange={updateFieldsState}
            isFirst={field.fieldOrder === 0}
            isLast={field.fieldOrder === fields.length - 1}
          />
        ))}
      </ScrollView>
    </ScreenContainer>
  );
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    content: {
      paddingBottom: theme.spacing.xl,
      gap: theme.spacing.md,
    },
    switchRow: {
      marginTop: theme.spacing.md,
      alignItems: "flex-start",
    },
    fieldHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "baseline",
      marginTop: theme.spacing.lg,
    },
  });
