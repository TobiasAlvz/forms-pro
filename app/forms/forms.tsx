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
        <Title>Editing form</Title>
        <Text>{formId}</Text>

        <Input placeholder="Title" value={title} onChangeText={setTitle} />
        <Input
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />

        <View style={styles.switchRow}>
          <Switch
            label="Published?"
            value={isPublished}
            onValueChange={setIsPublished}
          />
        </View>

        <Button title="Save form" onPress={() => {}} />

        <View style={styles.buttonsRow}>
          <Button
            title="Preview form"
            style={{ flex: 1 }}
            variant="outline"
            onPress={() => {}}
          />
          <Button
            title="Delete form"
            style={{ flex: 1 }}
            variant="danger"
            onPress={() => {}}
          />
        </View>

        <View style={styles.fieldHeader}>
          <Title>Fields</Title>
          <Button title="Add field" variant="outline" onPress={() => {}} />
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
