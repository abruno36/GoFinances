import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { HighligthCard } from '../../components/HighligthCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';

import { 
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  HighligthCards,
  Transactions,
  Title,
  TransactionList,
  LogoutButton
} from './styles';

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export function Dashboard() {
  const [data, setData] = useState<DataListProps[]>([]);

  async function loadTransactions() {
    const dataKey = '@gofinances:transactions';
    const response = await AsyncStorage.getItem(dataKey);

    const transactions = response ? JSON.parse(response) : [];

    const transactionsFormatted: DataListProps[] = transactions
      .map((item: DataListProps) => {
        const amount = Number(item.amount)
        .toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        });

        const date = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit'
        }).format(new Date(item.date));

        return {
          id: item.id,
          name: item.name,
          amount,
          type: item.type,
          category: item.category,
          date
        }
      });
  
    setData(transactionsFormatted);
    console.log(JSON.parse(transactions!));
  }

  useEffect(() => {
    loadTransactions(); 
  },[]);

  return (
    <Container>
        <Header>
          <UserWrapper>
            <UserInfo>
              <Photo source={{ uri: 'https://raw.githubusercontent.com/abruno36/GoFinances/master/src/assets/financas1.png'}}/>
              <User>
                <UserGreeting>Go Finances,</UserGreeting>
                <UserName>Seja Bem Vindo(a)!</UserName>
              </User>
            </UserInfo>

            <LogoutButton onPress={() => {}}>
                <Icon name="power"/>
            </LogoutButton>
            
          </UserWrapper>
        </Header>

        <HighligthCards>
          <HighligthCard 
            type="up"
            title="Entradas" 
            amount="R$ 40.400,00" 
            lastTransaction="Última entrada 01 de Agosto"/>
          <HighligthCard  
            type="down" 
            title="Saídas" 
            amount="R$ 7.459,00" 
            lastTransaction="Última saída 20 de Agosto"/>
          <HighligthCard 
            type="total"  
            title="Total" 
            amount="R$ 32.941,00" 
            lastTransaction="01 a 30 de Agosto"/>
        </HighligthCards>

        <Transactions>
           <Title>Listagem</Title>

           <TransactionList 
              data={data}
              keyExtractor={item => item.id}
              renderItem={({ item }) => <TransactionCard data={item}/>}
           />
           
           
        </Transactions>
    </Container>
  )
}