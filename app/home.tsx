import { FormsOverviewCard } from "@/components/home/FormsOverviewCard";
import { QuickLinks } from "@/components/home/QuickLinks";
import { ScreenContainer } from "@/components/ScreenContainer";
import { Title } from "@/components/Title";
import { useSession } from "@/providers/SessionContext";
import formsService from "@/services/forms-service";
import { useTheme } from "@/themes/ThemeContext";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";

export default function HomeScreen() {
  const { user, session } = useSession();
  const { theme } = useTheme();
  const router = useRouter();

  const [totalForms, setTotalForms] = useState(0);
  const [totalResponses, setTotalResponses] = useState(0);
  const [latestForm, setLatestForm] = useState<{ title: string; responses: number } | null>(null);
  const [loading, setLoading] = useState(true);

  // proteção de rota
  useEffect(() => {
    if (!session) {
      router.replace("/");
    }
  }, [session]);

  // carregar estatísticas reais
  useEffect(() => {
    if (!user) return;

    const loadStats = async () => {
      setLoading(true);

      const data = await formsService.getHomeStats(user.id);

      setTotalForms(data.totalForms);
      setTotalResponses(data.totalResponses);
      setLatestForm(data.latestForm);

      setLoading(false);
    };

    loadStats();
  }, [user]);

  return (
    <ScreenContainer>
      {/* HEADER */}
      <View style={{ marginBottom: theme.spacing.md }}>
        <Text
          style={{
            color: theme.colors.secondary,
            fontSize: theme.fontSizes.md,
          }}
        >
          Bem-vindo de volta,
        </Text>

        <Title>{user?.user_metadata?.name ?? "Usuário"}</Title>
      </View>

      {/* LOADING */}
      {loading ? (
        <ActivityIndicator
          size="large"
          color={theme.colors.primary}
          style={{ marginTop: 40 }}
        />
      ) : (
        <>
          <FormsOverviewCard
            totalForms={totalForms}
            totalResponses={totalResponses}
            latestForm={latestForm}
          />

          <View style={{ marginTop: theme.spacing.xl }}>
            <QuickLinks />
          </View>
        </>
      )}
    </ScreenContainer>
  );
}