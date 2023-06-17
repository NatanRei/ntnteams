import { Header } from '@components/Header';
import { Container } from './styles';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { useCallback, useEffect, useState } from 'react';
import { Alert, FlatList } from 'react-native';
import { Button } from '@components/Button';
import { ListEmpty } from '@components/ListEmpty';

import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { groupsGetAll } from '@storage/group/groupsGetAll';
import { Loading } from '@components/Loading';

export function Groups() {
  const [ isLoading, setIsLoading ] = useState(true)

  const [groups, setGroups] = useState<string[]>(['Galera da NTN', 'Galera de Teste'])

  const navigation = useNavigation()

  function handleNewGroup() {
    navigation.navigate('new')
  }

  async function fetchGroups() {
    try {
      setIsLoading(true)
      const data = await groupsGetAll()
      setGroups(data)
      setIsLoading(false)
    } catch (error) {
      console.log(error)  
      Alert.alert('Turmas', 'Não foi possivel carregar as turmas.')
    }
  }

  function handleOpenGroup(group: string) {
    navigation.navigate("players", { group })
  }

  useFocusEffect(useCallback(() => {
      fetchGroups()
    }, []))

  return (
    <Container>
      <Header />
      <Highlight title='Turmas' subtitle='jogue com a sua turma' />
      {
        isLoading ? <Loading /> :
        <FlatList 
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
        <GroupCard 
          title={item} 
          onPress={() => handleOpenGroup(item)}
        />
        )}
        contentContainerStyle={groups.length === 0 && {flex: 1}}
        ListEmptyComponent={() => (
          <ListEmpty message='Que tal criar a primeira turma?' />
        )}

      />}

      <Button 
        title="Criar nova turma"
        onPress={handleNewGroup}
      />
      
    </Container>
  );
}