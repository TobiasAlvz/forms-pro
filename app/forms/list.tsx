import { ScreenContainer } from "@/components/ScreenContainer";
import { Title } from "@/components/Title";
import { useSession } from "@/providers/SessionContext";
import formsService, { Form } from "@/services/forms-service";
import { Theme, useTheme } from "@/themes/ThemeContext";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { FlatList, StyleSheet } from "react-native";

export default function ListScreen() {
  const { user } = useSession();
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const router = useRouter();

  const [forms, setForms] = useState<Form[]>([]);

  useEffect(() => {
    if (user) {
      formsService.getUserForms(user.id).then((data) => {
        setForms(data);
      });
    }
  }, []);

  const renderForm = ({ item }: { item: Form }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        router.navigate({
          pathname: "/forms/form",
          params: { formId: item.id },
        })
      }
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>
        {item.description || "No description provided."}
      </Text>
      <Text
        style={[
          styles.status,
          {
            color: item.isPublished
              ? theme.colors.success
              : theme.colors.disabled,
          },
        ]}
      >
        {item.isPublished ? "Published" : "Draft"}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScreenContainer>
      <Title>Your forms</Title>

      <FlatList
        data={forms}
        renderItem={renderForm}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </ScreenContainer>
  );
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    list: {
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.xs,
      gap: theme.spacing.md,
    },
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.radius.md,
      padding: theme.spacing.md,
      elevation: 1,
    },
    title: {
      fontSize: theme.fontSizes.md,
      fontWeight: "bold",
      color: theme.colors.primary,
      marginBottom: theme.spacing.sm,
    },
    description: {
      fontSize: theme.fontSizes.sm,
      color: theme.colors.secondary,
      marginBottom: theme.spacing.xs,
    },
    status: {
      fontSize: theme.fontSizes.xs,
      fontWeight: "600",
    },
  });
