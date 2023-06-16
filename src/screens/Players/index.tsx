import  { Alert, FlatList } from 'react-native'

import  { useEffect, useState } from 'react'

import { Container, Form, HeaderList, NumbersOfPayers } from "./styles";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { PlayersCard } from '@components/PlayerCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';
import { useRoute } from '@react-navigation/native';
import { AppError } from '@utils/AppError';
import { playerAddByGroup } from '@storage/player/playerAddByGroup';
import { playersGetByGroupAndTeam } from '@storage/player/playersGetByGroupAndTeam';

import { PlayerStorageDTO } from '@storage/player/PlayerStorageDTO';

type RouteParams = {
    group: string
}

export function Players() {
    const [ newPlayerName, setNewPlayerName ] = useState('')
    const [ team, setTeam ] = useState('Time A')
    const [ players, setPlayers ] = useState<PlayerStorageDTO[]>([])

    const route = useRoute();
    const {  group } = route.params as RouteParams;

    async function handleAddPlayer() {
        if(newPlayerName.trim().length === 0) {
            return Alert.alert('Nova pessoa', 'Informe o nome da pessoa para adicionar.')
        }

        const newPlayer = {
            name: newPlayerName,
            team
        }

        try {
            await playerAddByGroup(newPlayer, group);
            fetchPLayersByTeam()
        } catch (error) {
            if (error instanceof AppError) {
                Alert.alert('nova pessoa', error.message)
            } else {
                console.log(error)
                Alert.alert('nova pessoa', 'Não foi possível adicionar.')
            }
        }
    }

    async function fetchPLayersByTeam() {
        try {
            const playersByTeam = await playersGetByGroupAndTeam(group, team);
            setPlayers(playersByTeam);
        } catch (error) {
            console.log(error)
            Alert.alert('Pessoas', 'Não foi possível carregar as pessoas do time selecionado.')
        }
    }

    useEffect(() => {
        fetchPLayersByTeam()
    }, [team])

    return (
        <Container>
            <Header showBackButton />
            <Highlight 
                title={group}
                subtitle="adicione e separe os times" 
            />
            <Form>           
                <Input 
                    placeholder="Nome da pessoa" 
                    autoCorrect={false}
                    onChangeText={setNewPlayerName}
                />
                <ButtonIcon 
                    icon="add" 
                    onPress={handleAddPlayer}
                />
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
                keyExtractor={item => item.name}
                renderItem={({ item }) => (
                    <PlayersCard 
                        name={item.name} 
                        onRemove={() => {}}
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