import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'styled-components';

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
  LogoutButton,
  LoadContainer
} from './styles';

import { useAuth } from '../../hooks/auth';

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighligthProps {
  amount: string;
  lastTransaction: string;
}

interface HighligthData {
  entries: HighligthProps;
  expensives: HighligthProps;
  total: HighligthProps;
}

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<DataListProps[]>([]);

  const [highligthData, setHighligthData] = useState<HighligthData>({} as HighligthData);

  const theme = useTheme();
  const { user, signOut } = useAuth();

  function getLastTransactionDate(collection: DataListProps[], 
    type: 'positive' | 'negative'
    ) {
    const lastTransaction = new Date(
    Math.max.apply(Math, collection
    .filter(transaction => transaction.type === type)
    .map(transaction => new Date(transaction.date).getTime())))

    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', { month: 'long'})}`;
  }

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
  
      setTransactions(transactionsFormatted);

      const lastTransactionsEntries = getLastTransactionDate(transactions, 'positive');
      const lastTransactionsExpensives = getLastTransactionDate(transactions, 'negative');
      const totalInterval = `01 a ${lastTransactionsExpensives}`;
      
      //console.log(new Date(lastTransactionsEntries));

      const total = entriesTotal - expensiveTotal;

      setHighligthData({
        entries: {
          amount: entriesTotal.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            }),
            //lastTransaction: lastTransactionsEntries === 0 ? 'Não há transações' : `Última entrada dia ${lastTransactionsEntries}`,
            lastTransaction: `Última entrada dia ${lastTransactionsEntries}`,
        },
        expensives: {
          amount: expensiveTotal.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            }),
            //lastTransaction: lastTransactionsExpensives === 0 ? 'Não há transações' : `Última saída dia ${lastTransactionsExpensives}`,
            lastTransaction: `Última saída dia ${lastTransactionsExpensives}`,
        },
        total: {
          amount: total.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
            }),
            lastTransaction: totalInterval
        }

    })
      
    //console.log(transactions);
    setIsLoading(false);
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
      {
        isLoading ? 
        <LoadContainer>
          <ActivityIndicator 
            color={theme.colors.primary}
            size="large"/>
        </LoadContainer> :
        <>
            <Header>
              <UserWrapper>
                <UserInfo>
                <Photo source={{uri: user.photo }}/>
                  <User>
                    <UserGreeting>Go Finances,</UserGreeting>
                    <UserName>{user.name}</UserName>
                  </User>
                </UserInfo>

                <LogoutButton onPress={() => {}}>
                    <Icon name="power" onPress={signOut}/>
                </LogoutButton>
                
              </UserWrapper>
            </Header>

            <HighligthCards>
              <HighligthCard 
                type="up"
                title="Entradas" 
                amount={highligthData.entries.amount} 
                lastTransaction={highligthData.entries.lastTransaction}/>
              <HighligthCard  
                type="down" 
                title="Saídas" 
                amount={highligthData.expensives.amount} 
                lastTransaction={highligthData.expensives.lastTransaction}/>
              <HighligthCard 
                type="total"  
                title="Total" 
                amount={highligthData.total.amount} 
                lastTransaction={highligthData.total.lastTransaction}/>
            </HighligthCards>

            <Transactions>
              <Title>Listagem</Title>

              <TransactionList 
                  data={transactions}
                  keyExtractor={item => item.id}
                  renderItem={({ item }) => <TransactionCard data={item}/>}
              />
            </Transactions>
          </>
        }
    </Container>
  )
}
