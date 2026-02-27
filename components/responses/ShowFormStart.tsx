import { FC } from "react";
import { Text, StyleSheet } from "react-native";
import { ScreenContainer } from "@/components/ScreenContainer";
import { Title } from "@/components/Title";
import { Button } from "@/components/Button";
import { Theme, useTheme } from "@/themes/ThemeContext";

interface Props {
  title: string;
  description: string;
  onStart: () => void;
}

export const ShowFormStart: FC<Props> = ({ title, description, onStart }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <ScreenContainer style={styles.container}>
      <Title align="center">{title}</Title>

      {!!description && <Text style={styles.description}>{description}</Text>}

      <Button title="Iniciar" onPress={onStart} />
    </ScreenContainer>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      gap: theme.spacing.lg,
    },
    description: {
      textAlign: "center",
      color: theme.colors.text,
      fontSize: theme.fontSizes.md,
    },
  });
