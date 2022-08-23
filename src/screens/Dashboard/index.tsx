import React from 'react';

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
  const data: DataListProps[] = [
    {
      id: '1',
      type: 'positive',
      title: "Desenvolvimento App",
      amount: "R$ 18.000,00",
      category: {
          name: "Vendas",
          icon: "dollar-sign"
      },
      date: "20/08/2022"
    },
    {
      id: '2',
      type: 'negative',
      title: "Compra PS5",
      amount: "R$ 5.000,00",
      category: {
        name: "Vendas",
        icon: "shopping-bag"
      },
      date: "20/08/2022"
    },
    { 
      id: '3',
      type: 'negative',
      title: "Aluguel do apartamento",
      amount: "R$ 2.400,00",
      category: {
        name: "Vendas",
        icon: "shopping-bag"
      },
      date: "20/08/2022"
    },
    { 
      id: '4',
      type: 'negative',
      title: "Hamburgueria Pizzy",
      amount: "R$ 59,00",
      category: {
        name: "Alimentação",
        icon: "coffee"
      },
      date: "20/08/2022"
    },
    { 
      id: '5',
      type: 'positive',
      title: "Arezzo",
      amount: "R$ 22.400,00",
      category: {
        name: "Vendas",
        icon: "dollar-sign"
      },
      date: "20/08/2022"
    }
  ];

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