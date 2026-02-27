import formsService, { Field, Form, Response } from "@/services/forms-service";
import { Theme, useTheme } from "@/themes/ThemeContext";
import { Feather } from "@expo/vector-icons";
import { FC, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface ViewResponsesModalProps {
  form: Form;
  fields: Field[];
  visible: boolean;
  onClose: () => void;
}

export const ViewResponsesModal: FC<ViewResponsesModalProps> = ({
  form,
  fields,
  visible,
  onClose,
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [responses, setResponses] = useState<Response[]>([]);
  const [loading, setLoading] = useState(false);

  // carrega sempre que abrir o modal
  useEffect(() => {
    if (!visible) return;

    setLoading(true);

    formsService.getFormResponses(form.id).then((data) => {
      setResponses(data);
      setLoading(false);
    });
  }, [visible]);

  // mapa id → label
  const fieldLabels = fields.reduce((obj, field) => {
    obj[field.id] = field.label;
    return obj;
  }, {} as Record<string, string>);

  // formata respostas (especialmente multiple_option)
  const formatAnswer = (answer: any) => {
    if (!answer) return "";

    if (typeof answer !== "string") return String(answer);

    try {
      const parsed = JSON.parse(answer);
      if (Array.isArray(parsed)) return parsed.join(", ");
      return answer;
    } catch {
      return answer;
    }
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>Respostas enviadas</Text>

          <TouchableOpacity onPress={onClose}>
            <Feather name="x" size={26} color={theme.colors.text} />
          </TouchableOpacity>
        </View>

        {/* LOADING */}
        {loading && (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
          </View>
        )}

        {/* SEM RESPOSTAS */}
        {!loading && responses.length === 0 && (
          <Text style={styles.empty}>Ainda não há respostas para este formulário.</Text>
        )}

        {/* LISTA */}
        {!loading && responses.length > 0 && (
          <FlatList
            data={responses}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.answerCard}>
                <Text style={styles.answerDate}>
                  Enviado em:{" "}
                  {new Date(item.submittedAt).toLocaleString("pt-BR")}
                </Text>

                {Object.entries(item.answers).map(([fieldId, answer]) => (
                  <View key={fieldId} style={styles.answerItem}>
                    <Text style={styles.answerKey}>
                      {fieldLabels[fieldId] ?? "Pergunta"}
                    </Text>

                    <Text style={styles.answerValue}>
                      {formatAnswer(answer)}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          />
        )}
      </View>
    </Modal>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: theme.spacing.xl,
      paddingHorizontal: theme.spacing.md,
      backgroundColor: theme.colors.background,
    },

    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: theme.spacing.lg,
    },

    title: {
      color: theme.colors.text,
      fontSize: theme.fontSizes.lg,
      fontWeight: "bold",
    },

    loading: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },

    list: {
      paddingBottom: theme.spacing.xl,
    },

    answerCard: {
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.radius.md,
      padding: theme.spacing.md,
      marginBottom: theme.spacing.md,
      backgroundColor: theme.colors.surface,
    },

    answerDate: {
      color: theme.colors.secondary,
      fontSize: theme.fontSizes.xs,
      marginBottom: theme.spacing.sm,
    },

    answerItem: {
      marginBottom: theme.spacing.sm,
    },

    answerKey: {
      color: theme.colors.text,
      fontWeight: "600",
      fontSize: theme.fontSizes.sm,
      marginBottom: 2,
    },

    answerValue: {
      color: theme.colors.text,
      fontSize: theme.fontSizes.sm,
    },

    empty: {
      textAlign: "center",
      marginTop: theme.spacing.xl,
      color: theme.colors.secondary,
      fontSize: theme.fontSizes.md,
    },
  });