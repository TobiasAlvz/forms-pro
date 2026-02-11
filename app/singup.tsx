import { ScreenContainer } from "@/components/ScreenContainer";
import { SingUpForm } from "@/components/SingUpForm";
import { Title } from "@/components/Title";

export default function SingUpScreen() {
  return (
    <ScreenContainer>
      <Title align="center">Crie sua Conta</Title>
      <SingUpForm />
    </ScreenContainer>
  );
}
