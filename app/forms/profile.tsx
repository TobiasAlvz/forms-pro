import { UpdatePasswordSection } from "@/components/profile/UpdatePasswordSection";
import { UpdateProfileSection } from "@/components/profile/UpdateProfileSection";
import { ScreenContainer } from "@/components/ScreenContainer";
import { Text } from "react-native";

export default function ProfileScreen() {
  return (
    <ScreenContainer>
      <Text></Text>
      <UpdateProfileSection />
      <UpdatePasswordSection />
    </ScreenContainer>
  );
}
