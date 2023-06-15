import { Header } from "@components/Header";
import { Container, Content, Icon } from "./styles";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";
import { Input } from "@components/Input";

export function NewGroup() {
    return (
        <Container>
            <Header showBackButton/>
            <Content>
                <Icon />
                <Highlight 
                    title="nova turma" 
                    subtitle="crie a turma para adicionar as pessoas" 
                />
                <Input placeholder="Nome da turma"/>
                <Button title="Criar" />
            </Content>
        </Container>
    )
}