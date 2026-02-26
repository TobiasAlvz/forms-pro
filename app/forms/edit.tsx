import { Button } from "@/components/Button";
import { FieldCard } from "@/components/home/EditField";
import { Input } from "@/components/input";
import { ScreenContainer } from "@/components/ScreenContainer";
import { Switch } from "@/components/switch";
import { Title } from "@/components/Title";
import confirm from "@/services/confirm";
import formsService, { Field } from "@/services/forms-service";
import { Theme, useTheme } from "@/themes/ThemeContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";

export default function EditFormScreen() {
  const params = useLocalSearchParams();
  const formId = Array.isArray(params.formId)
    ? params.formId[0]
    : params.formId;

  const router = useRouter();
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [fields, setFields] = useState<Field[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!formId) return;

    const loadForm = async () => {
      try {
        setLoading(true);

        const data = await formsService.getFormById(formId);

        if (!data) {
          Alert.alert("Erro", "Formulário não encontrado.");
          router.back();
          return;
        }

        setTitle(data.form.title ?? "");
        setDescription(data.form.description ?? "");
        setIsPublished(data.form.isPublished ?? false);
        setFields(data.fields ?? []);
      } catch (error) {
        console.log(error);
        Alert.alert("Erro", "Falha ao carregar o formulário.");
      } finally {
        setLoading(false);
      }
    };

    loadForm();
  }, [formId]);

  const saveForm = async () => {
    if (!formId) return;

    if (!title.trim()) {
      Alert.alert("Validação", "O formulário precisa ter um título.");
      return;
    }

    try {
      const result = await formsService.updateForm(formId, {
        title,
        description,
        isPublished,
      });

      if (!result) {
        Alert.alert("Erro", "Não foi possível salvar o formulário.");
        return;
      }

      Alert.alert("Sucesso", "Formulário salvo com sucesso!");
      router.back();
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Ocorreu um erro ao salvar o formulário.");
    }
  };

  const deleteForm = async () => {
    if (!formId) return;

    confirm(
      "Excluir Formulário",
      "Excluir definitivamente o formulário?",
      async () => {
        const ok = await formsService.deleteForm(formId);

        if (!ok) {
          Alert.alert("Erro", "Não foi possível apagar o formulário");
          return;
        }

        router.replace("/forms/list");
      },
    );
  };

  const addField = async () => {
    if (!formId) return;

    const nextOrder =
      fields.length > 0 ? Math.max(...fields.map((f) => f.fieldOrder)) + 1 : 0;

    const field = await formsService.addField(formId, nextOrder);
    if (!field) return;

    setFields((current) => [...current, field]);
  };

  const updateFieldsState = (fieldId: string, changes: Partial<Field>) => {
    setFields((current) =>
      current.map((f) => (f.id === fieldId ? { ...f, ...changes } : f)),
    );
  };

  const saveField = async (fieldId: string, field: Field) => {
    await formsService.updateField(fieldId, field);
    Alert.alert("Campo salvo");
  };

  const removeField = async (fieldId: string) => {
    await formsService.removeField(fieldId);
    setFields((current) => current.filter((f) => f.id !== fieldId));
  };

  const previewForm = () => {
    if (!formId) return;

    router.push({
      pathname: "/forms/form",
      params: { formId },
    });
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

        <View style={styles.buttonsRow}>
          <Button
            title="Visualizar formulário"
            style={{ flex: 1 }}
            variant="outline"
            onPress={previewForm}
          />
          <Button
            title="Excluir formulário"
            style={{ flex: 1 }}
            variant="danger"
            onPress={deleteForm}
          />
        </View>

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
            onStateChange={updateFieldsState}
            onRemove={removeField}
            onMoveUp={() => {}}
            onMoveDown={() => {}}
            isFirst={false}
            isLast={false}
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
    buttonsRow: {
      flexDirection: "row",
      gap: theme.spacing.sm,
    },
    fieldHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "baseline",
      marginTop: theme.spacing.lg,
    },
  });
