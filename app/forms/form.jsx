import formsService, { Field, Form } from "@/services/forms-service";
import { Theme, useTheme } from "@/themes/ThemeContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

export default function ShowFormScreen() {
  const { formId } = useLocalSearchParams();

  const { theme } = useTheme();F
  const styles = createStyles(theme);
  const router = useRouter();

  const [form, setForm] = useState<Form | null>(null);
  const [fields, setFields] = useState<Field[]>([]);
  const [responseCount, setResponseCount] = useState(0);

  useEffect(() => {
    if (typeof formId !== 'string') {
      Alert.alert('Error', 'Invalid form id.');
      return;
    }
    formsService.getFormById(formId).then((data) => {
      if (!data) return;
      setForm(data.form);
      setFields(data.fields ?? [])
      setResponseCount(data.responseCount ?? 0);
    });
  }, [formId]);

  return (
    <ScreenContainer>
      <Title>{form?.title}</Title>
      <Text style={styles.description}>{form?.description}</Text>

      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>Stats</Text>
        <Text style={styles.stat}>Total Responses: {responseCount}</Text>
        <Text style={styles.stat}>Fields: {fields.length}</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <Button
          title="Edit form"
          onPress={() => router.navigate({ pathname: '/forms/edit/[formId]', params: { formId } })}
          style={styles.button}
          variant="outline"
        />
        <Button
          title="View responses"
          onPress={() => { }}
          style={styles.button}
        />
      </View>
    </ScreenContainer>
  )
}

const createStyles = (theme: Theme) => StyleSheet.create({
  container: {
    padding: theme.spacing.md,
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.fontSizes.xl,
    fontWeight: 'bold',
    marginBottom: theme.spacing.sm,
  },
  description: {
    color: theme.colors.text,
    fontSize: 16,
    marginBottom: theme.spacing.md,
  },
  statsSection: {
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    color: theme.colors.text,
    fontSize: theme.fontSizes.lg,
    fontWeight: '600',
    marginBottom: theme.spacing.sm,
  },
  stat: {
    color: theme.colors.text,
    fontSize: theme.fontSizes.md,
    marginBottom: theme.spacing.xs,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: theme.spacing.sm,
  },
  button: {
    flex: 1,
  },
});