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
  const [loading, setLoading] = useState(true);

  // carregar formulário
  useEffect(() => {
    const loadForm = async () => {
      if (!formId || typeof formId !== "string") return;

      try {
        const data = await formsService.getFormById(formId);

        if (!data) {
          Alert.alert("Erro", "Formulário não encontrado.");
          router.back();
          return;
        }

        setTitle(data.form.title ?? "");
        setDescription(data.form.description ?? "");
        setIsPublished(data.form.isPublished ?? false);
      } catch (error) {
        console.log(error);
        Alert.alert("Erro", "Falha ao carregar o formulário.");
      } finally {
        setLoading(false);
      }
    };

    loadForm();
  }, [formId]);

  // salvar
  const saveForm = async () => {
    if (typeof formId !== "string") return;

    if (loading) {
      Alert.alert("Aguarde", "O formulário ainda está carregando.");
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
      router.back(); // <<< ESSENCIAL
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Ocorreu um erro ao salvar o formulário.");
    }
  };

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={styles.content}>
        <Title>Editando formulário</Title>
        <Text>{formId}</Text>

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
            onPress={() => {}}
          />
          <Button
            title="Excluir formulário"
            style={{ flex: 1 }}
            variant="danger"
            onPress={() => {}}
          />
        </View>

        <View style={styles.fieldHeader}>
          <Title>Campos</Title>
          <Button
            title="Adicionar campo"
            variant="outline"
            onPress={() => {}}
          />
        </View>
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
