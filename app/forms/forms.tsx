import { Button } from "@/components/Button";
import { Input } from "@/components/input";
import { ScreenContainer } from "@/components/ScreenContainer";
import { Switch } from "@/components/switch";
import { Title } from "@/components/Title";
import formsService from "@/services/forms-service";
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
  const [setLoading] = useState(true);

  // carregar dados do formulário
  useEffect(() => {
    const loadForm = async () => {
      if (!formId || typeof formId !== "string") {
        Alert.alert("Erro", "Formulário inválido.");
        router.back();
        return;
      }

      const data = await formsService.getFormById(formId);

      if (!data) {
        Alert.alert("Erro", "Formulário não encontrado.");
        router.back();
        return;
      }

      setTitle(data.form.title ?? "");
      setDescription(data.form.description ?? "");
      setIsPublished(data.form.isPublished ?? false);
    };

    loadForm();
  }, [formId]);

  const saveForm = async () => {
    if (typeof formId !== "string") return;

    const result = await formsService.updateForm(formId, {
      title,
      description,
      isPublished,
    });

    if (!result) {
      Alert.alert("Erro", "Falha ao salvar.");
      return;
    }

    Alert.alert("Sucesso", "Formulário salvo!");
    router.back();
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
  });
