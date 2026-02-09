import { ScreenContainer } from "@/components/ScreenContainer";
import { Title } from "@/components/Title";
import { Button } from "@/components/Button";
import { useState } from "react";
import { Input } from "@/components/input";

// https://www.notion.so/Atividade-302cc8c2db9680cfbd7ac2998d7dbba1
export default function Home() {
  const [name, setName] = useState("");

  return (
    <ScreenContainer>
      <Title align="center">Forms Pro</Title>

      <Input
        placeholder="Digite seu nome"
        value={name}
        onChangeText={setName}
      />

      <Button
        title="Entrar"
        onPress={() => console.log(name)}
        style={{ marginTop: 20 }}
      />
    </ScreenContainer>
  );
}
