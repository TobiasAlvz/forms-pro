import { ScreenContainer } from "@/components/ScreenContainer";
import { Title } from "@/components/Title";
import { Button } from "@/components/Button";
import formsService, { Form } from "@/services/forms-service";
import { useSession } from "@/providers/SessionContext";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

export default function FormsListScreen() {
  const { user } = useSession();
  const router = useRouter();

  const [forms, setForms] = useState<Form[]>([]);
  const [loading, setLoading] = useState(true);

  const loadForms = async () => {
    if (!user) return;
    setLoading(true);
    const data = await formsService.getUserForms(user.id);
    setForms(data);
    setLoading(false);
  };

  // mantém atualização automática
  useFocusEffect(
    useCallback(() => {
      loadForms();
    }, [user]),
  );

  const openForm = (id: string) => {
    router.push(`/forms/edit?formId=${id}`);
  };

  const renderItem = ({ item }: { item: Form }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={() => openForm(item.id)}
    >
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>

        <View
          style={[
            styles.badge,
            { backgroundColor: item.isPublished ? "#DCFCE7" : "#FEF3C7" },
          ]}
        >
          <Text
            style={[
              styles.badgeText,
              { color: item.isPublished ? "#166534" : "#92400E" },
            ]}
          >
            {item.isPublished ? "Publicado" : "Rascunho"}
          </Text>
        </View>
      </View>

      <Text style={styles.description} numberOfLines={2}>
        {item.description || "Sem descrição informada."}
      </Text>

      <View style={styles.actions}>
        <Button title="Editar formulário" onPress={() => openForm(item.id)} />
      </View>
    </TouchableOpacity>
  );

  return (
    <ScreenContainer>
      <Title>Seus formulários</Title>

      {!loading && forms.length === 0 && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>Nenhum formulário ainda</Text>
          <Text style={styles.emptyText}>
            Crie seu primeiro formulário para começar a receber respostas.
          </Text>
        </View>
      )}

      <FlatList
        data={forms}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingVertical: 12,
    gap: 12,
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 16,
    marginHorizontal: 2,

    // sombra iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,

    // sombra Android
    elevation: 4,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
    flex: 1,
    marginRight: 10,
  },

  description: {
    color: "#6B7280",
    fontSize: 14,
    marginBottom: 12,
  },

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },

  badgeText: {
    fontSize: 12,
    fontWeight: "600",
  },

  actions: {
    marginTop: 4,
  },

  emptyContainer: {
    marginTop: 80,
    alignItems: "center",
    paddingHorizontal: 24,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 6,
  },

  emptyText: {
    textAlign: "center",
    color: "#6B7280",
  },
});
