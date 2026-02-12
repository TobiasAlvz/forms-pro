import { FormsOverviewCard } from "@/components/home/FormsOverviewCard";
import { QuickLinks } from "@/components/home/QuickLinks";
import { ScreenContainer } from "@/components/ScreenContainer";
import { Title } from "@/components/Title";

import { useSession } from "@/providers/SessionContext";
import { useTheme } from "@/themes/ThemeContext";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function HomeScreen() {
  const { user, session } = useSession();
  const { theme } = useTheme();
  const router = useRouter();

  const totalForms = 9;
  const totalResponses = 176;
  const latestForm = { title: "Customer Feedback Form", responses: 42 };

  useEffect(() => {
    if (!session) {
      router.replace("/");
    }
  }, [session, router]);

  return (
    <ScreenContainer>
      <View style={{ marginBottom: theme.spacing.md }}>
        <Text
          style={{
            color: theme.colors.secondary,
            fontSize: theme.fontSizes.md,
          }}
        >
          Welcome back,
        </Text>
        <Title>{user?.user_metadata.name}</Title>
      </View>

      <FormsOverviewCard
        totalForms={totalForms}
        totalResponses={totalResponses}
        latestForm={latestForm}
      />

      <View style={{ marginTop: theme.spacing.xl }}>
        <QuickLinks />
      </View>
    </ScreenContainer>
  );
}
