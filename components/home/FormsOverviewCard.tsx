import { Theme, useTheme } from "@/themes/ThemeContext";
import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  totalForms: number;
  totalResponses: number;
  latestForm?: { title: string; responses: number };
}

export const FormsOverviewCard: FC<Props> = ({
  totalForms,
  totalResponses,
  latestForm,
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Sua atividade</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Total de formulários:</Text>
        <Text style={styles.value}>{totalForms}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Total de respostas:</Text>
        <Text style={styles.value}>{totalResponses}</Text>
      </View>

      <View style={styles.divider} />

      <Text style={styles.subtitle}>Formulário mais recente:</Text>

      {latestForm ? (
        <>
          <Text style={styles.recentTitle}>{latestForm.title}</Text>
          <Text style={styles.responses}>{latestForm.responses} respostas</Text>
        </>
      ) : (
        <Text style={styles.noLatestFormText}>
          Nenhum formulário recente encontrado
        </Text>
      )}
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.colors.surface,
      padding: theme.spacing.md,
      borderRadius: theme.radius.md,
      shadowColor: theme.colors.shadow,
      shadowOpacity: 0.05,
      shadowRadius: 4,
    },
    title: {
      fontSize: theme.fontSizes.lg,
      fontWeight: "600",
      marginBottom: theme.spacing.md,
      color: theme.colors.text,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: theme.spacing.sm,
    },
    label: {
      color: theme.colors.secondary,
    },
    value: {
      fontWeight: "600",
      color: theme.colors.text,
    },
    divider: {
      height: 1,
      backgroundColor: theme.colors.border,
      marginVertical: theme.spacing.md,
    },
    subtitle: {
      color: theme.colors.secondary,
      fontSize: theme.fontSizes.sm,
      marginBottom: theme.spacing.sm,
    },
    noLatestFormText: {
      color: theme.colors.onSurface,
      textAlign: "center",
    },
    recentTitle: {
      color: theme.colors.text,
      fontSize: theme.fontSizes.md,
      fontWeight: "600",
    },
    responses: {
      color: theme.colors.success,
      fontSize: theme.fontSizes.sm,
    },
  });
