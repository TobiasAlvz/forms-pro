import { useSession } from "@/providers/SessionContext";
import { useTheme } from "@/themes/ThemeContext";
import { View } from "react-native";
import { Button } from "../Button";


export const QuickLinks = () => {
  const { theme, switchTheme } = useTheme();
  const { signOut } = useSession();

  return (
    <View style={{ gap: theme.spacing.sm }}>
      <Button title="Create new form" onPress={() => {}} />
      <Button title="All forms" variant="outline" onPress={() => {}} />
      <Button title="View profile" variant="outline" onPress={() => {}} />
      <Button
        title="Switch theme"
        variant="outline"
        onPress={() => switchTheme()}
      />
      <Button title="Sign out" variant="danger" onPress={() => signOut()} />
    </View>
  );
};
