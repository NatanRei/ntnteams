import  { Alert, FlatList, TextInput } from 'react-native'

import  { useEffect, useRef, useState } from 'react'

import { Container, Form, HeaderList, NumbersOfPayers } from "./styles";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { PlayersCard } from '@components/PlayerCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AppError } from '@utils/AppError';
import { playerAddByGroup } from '@storage/player/playerAddByGroup';
import { playersGetByGroupAndTeam } from '@storage/player/playersGetByGroupAndTeam';

import { PlayerStorageDTO } from '@storage/player/PlayerStorageDTO';
import { playerRemoveByGroup } from '@storage/player/playerRemoveByGroup';
import { groupRemoveByName } from '@storage/group/groupRemoveByName';
import { Loading } from '@components/Loading';

type RouteParams = {
    group: string
}

export function Players() {
    const [ isLoading, setIsLoading ] = useState(true)
    const [ newPlayerName, setNewPlayerName ] = useState('')
    const [ team, setTeam ] = useState('Time A')
    const [ players, setPlayers ] = useState<PlayerStorageDTO[]>([])

    const navigation = useNavigation()

    const route = useRoute();
    const {  group } = route.params as RouteParams;

    const newPlayerNameInputRef = useRef<TextInput>(null)

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
            newPlayerNameInputRef.current?.blur()

            setNewPlayerName('')
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
            setIsLoading(true)
            const playersByTeam = await playersGetByGroupAndTeam(group, team);
            setPlayers(playersByTeam);
            setIsLoading(false);
        } catch (error) {
            console.log(error)
            Alert.alert('Pessoas', 'Não foi possível carregar as pessoas do time selecionado.')
        }
    }

    async function handlePlayerRemove(playerName: string) {
        try {
            await playerRemoveByGroup(playerName, group)
            fetchPLayersByTeam()

        } catch (error) {
            console.log(error)
            Alert.alert('Remover pessoa', 'Não foi possível remover a pessoa.')
        }
    }

    async function groupRemove() {
        try {
            await groupRemoveByName(group)
            navigation.navigate('groups');
        } catch (error) {
            console.log(error)
            Alert.alert('Remover grupo', 'Não foi possível remover o grupo.')
        }
    }

    async function handleGroupRemove() {
        Alert.alert(
            'Remover',
            'Deseja remover o grupo?',
            [
                { text: 'Não', style: 'cancel' },
                { text: 'Sim', onPress: () => groupRemove() },
                
            ]
        )
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
                    inputRef={newPlayerNameInputRef}
                    placeholder="Nome da pessoa" 
                    autoCorrect={false}
                    onChangeText={setNewPlayerName}
                    value={newPlayerName}
                    onSubmitEditing={handleAddPlayer}
                    returnKeyType='done'
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
            
            {
                isLoading ? <Loading /> :
                <FlatList 
                data={players}
                keyExtractor={item => item.name}
                renderItem={({ item }) => (
                    <PlayersCard 
                        name={item.name} 
                        onRemove={() => handlePlayerRemove(item.name)}
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
            />}

            <Button 
                title='Remover Turma' 
                type='SECONDARY'
                onPress={handleGroupRemove}
            ></Button>

            
        </Container>
    )
}