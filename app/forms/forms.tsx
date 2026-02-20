import { Button } from "@/components/Button";
import { Input } from "@/components/input";
import { ScreenContainer } from "@/components/ScreenContainer";
import { Switch } from "@/components/switch";
import { Title } from "@/components/Title";
import { Theme, useTheme } from "@/themes/ThemeContext";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function EditFormScreen() {
  const { formId } = useLocalSearchParams();
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPublished, setIsPublished] = useState(false);

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

        <Button title="Salvar formulário" onPress={() => {}} />

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
