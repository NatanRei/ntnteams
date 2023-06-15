import  { FlatList } from 'react-native'

import  { useState } from 'react'

import { Container, Form, HeaderList, NumbersOfPayers } from "./styles";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { PlayersCard } from '@components/PlayerCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';


export function Players() {

    const [ team, setTeam ] = useState('Time A')
    const [ players, setPlayers ] = useState(["Natan", "Reis", "teste"])

    const handleRemovePlayers = (playerToRemove: string) => {
        setPlayers(players.filter(player => player!== playerToRemove))
    }

    return (
        <Container>
            <Header showBackButton />
            <Highlight 
                title="Nome da turma" 
                subtitle="adicione e separe os times" 
            />
            <Form>           
                <Input 
                    placeholder="Nome da pessoa" 
                    autoCorrect={false}
                />
                <ButtonIcon icon="add" />
            </Form> 
            <HeaderList>
                <FlatList 
                    data={['Time A', 'Time B']}
                    keyExtractor={item => item}
                    renderItem={({ item }) => (
                        <Filter 
                            title={item} 
                            isActive={item === team}
                            onPress={() => setTeam(item)}
                        /> 
                    )}
                    horizontal
                />
                <NumbersOfPayers>
                    {players.length}
                </NumbersOfPayers>
            </HeaderList>

            <FlatList 
                data={players}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <PlayersCard 
                        name={item} 
                        onRemove={() => handleRemovePlayers(item)}
                    />
                )}    
                ListEmptyComponent={() => (
                <ListEmpty message='Que tal criar a primeira turma?' />
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                    { paddingBottom: 100 },
                    players.length === 0 && { flex: 1 }
                ]}
            />

            <Button title='Remover Turma' type='SECONDARY'></Button>

            
        </Container>
    )
}