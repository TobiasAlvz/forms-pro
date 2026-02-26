import { useTheme } from "@/themes/ThemeContext";
import { FC } from "react";
import { Text } from "react-native";
import { ScreenContainer } from "../ScreenContainer";
import { Title } from "../Title";
import { Button } from "../Button";


interface Props {
  title: string;
  description: string;
  onStart: () => void;
}

export const ShowFormStart: FC<Props> = ({ title, description, onStart }) => {
  const { theme } = useTheme();
  return (
    <ScreenContainer style={{ justifyContent: "center" }}>
      <Title align="center">{title}</Title>
      <Text style={{ textAlign: "center", marginBottom: theme.spacing.md }}>
        {description}
      </Text>
      <Button title="Start" onPress={onStart} />
    </ScreenContainer>
  );
};
