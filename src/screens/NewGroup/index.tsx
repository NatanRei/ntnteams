import { Header } from "@components/Header";
import { Container, Content, Icon } from "./styles";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { useNavigation } from "@react-navigation/native";

export function NewGroup() {
    const navigation = useNavigation()

    function handleNew() {
        navigation.navigate("players", { group: 'Natan' })
    }

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
                <Button title="Criar" onPress={handleNew} />
            </Content>
        </Container>
    )
}