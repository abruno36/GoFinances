import React, { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useFocusEffect } from '@react-navigation/native';

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

interface HighLigthProps {
  total: string;
}

interface HighLigthData {
  entries: HighLigthProps;
  expensives: HighLigthProps;
  total: HighLigthProps;
}

export function Dashboard() {
  const [transactions, setTransactions] = useState<DataListProps[]>([]);

  const [highligthData, setHighligthData] = useState<HighLigthData>({} as HighLigthData);

  async function loadTransactions() {
    const dataKey = '@gofinances:transactions';
    const response = await AsyncStorage.getItem(dataKey);

    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionsFormatted: DataListProps[] = transactions
      .map((item: DataListProps) => {

        if(item.type === 'positive'){
          entriesTotal += Number(item.amount);
        }else{
          expensiveTotal += Number(item.amount);
        }

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
  
      const total = entriesTotal - expensiveTotal;

      setTransactions(transactionsFormatted);

      setHighligthData({
        entries: {
            total: entriesTotal.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            }),
            //lastTransaction: lastTransactionsEntries === 0 ? 'Não há transações' : `Última entrada dia ${lastTransactionsEntries}`,
        },
        expensives: {
            total: expensiveTotal.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            }),
            //lastTransaction: lastTransactionsExpensives === 0 ? 'Não há transações' : `Última saída dia ${lastTransactionsExpensives}`,
        },
        total: {
            total: total.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
            }),
            //lastTransaction: totalInterval
        }

    })
      
    console.log(transactions);
  }

  useEffect(() => {
    loadTransactions(); 

    //limpar o AsincStorage
    // const dataKey = '@gofinances:transactions';
    // AsyncStorage.removeItem(dataKey);

  },[]);

  useFocusEffect(useCallback(() => {
    loadTransactions();
  },[]));

  return (
    <Container>
        <Header>
          <UserWrapper>
            <UserInfo>
              <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/5222757?s=400&u=07fab8df4c2007ef52cf5559689b51a668aceec0&v=4'}}/>
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
            amount={highligthData.entries.total} 
            lastTransaction="Última entrada 01 de Agosto"/>
          <HighligthCard  
            type="down" 
            title="Saídas" 
            amount={highligthData.expensives.total} 
            lastTransaction="Última saída 20 de Agosto"/>
          <HighligthCard 
            type="total"  
            title="Total" 
            amount={highligthData.total.total} 
            lastTransaction="01 a 30 de Agosto"/>
        </HighligthCards>

        <Transactions>
           <Title>Listagem</Title>

           <TransactionList 
              data={transactions}
              keyExtractor={item => item.id}
              renderItem={({ item }) => <TransactionCard data={item}/>}
           />
           
           
        </Transactions>
    </Container>
  )
}