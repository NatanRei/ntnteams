import { Header } from '@components/Header';
import { Container } from './styles';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { useState } from 'react';
import { FlatList } from 'react-native';
import { Button } from '@components/Button';
import { ListEmpty } from '@components/ListEmpty';

import { useNavigation } from '@react-navigation/native'

export function Groups() {
  const [groups, setGroups] = useState<string[]>(['Galera da NTN', 'Galera de Teste'])

  const navigation = useNavigation()

  function handleNewGroup() {
    navigation.navigate('new')
  }

  return (
    <Container>
      <Header />
      <Highlight title='Turmas' subtitle='jogue com a sua turma' />
      <FlatList 
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
        <GroupCard 
          title={item} 
        />
        )}
        contentContainerStyle={groups.length === 0 && {flex: 1}}
        ListEmptyComponent={() => (
          <ListEmpty message='Que tal criar a primeira turma?' />
        )}

      />

      <Button 
        title="Criar nova turma"
        onPress={handleNewGroup}
      />
      
    </Container>
  );
}