import React from 'react';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import { HighligthCard } from '../../components/HighligthCard';
import { TransactionCard } from '../../components/TransactionCard';

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
  TransactionList
} from './styles';

export function Dashboard() {
  const data = [
    {
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
      type: 'negative',
      title: "Compra PS5",
      amount: "R$ 5.000,00",
      category: {
        name: "Vendas",
        icon: "dollar-sign"
      },
      date: "20/08/2022"
    },
    { 
      type: 'negative',
      title: "Aluguel do apartamento",
      amount: "R$ 2.400,00",
      category: {
        name: "Vendas",
        icon: "dollar-sign"
      },
      date: "20/08/2022"
    },
    { 
      type: 'negative',
      title: "Hamburgueria Pizzy",
      amount: "R$ 59,00",
      category: {
        name: "Alimentação",
        icon: "dollar-sign"
      },
      date: "20/08/2022"
    },
    { 
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
            <Icon name="power"/>
          </UserWrapper>
        </Header>

        <HighligthCards>
          <HighligthCard 
            type="up"
            title="Entradas" 
            amount="R$ 17.400,00" 
            lastTransaction="Última entrada 01 de Abril"/>
          <HighligthCard  
            type="down" 
            title="Saídas" 
            amount="R$ 1.259,00" 
            lastTransaction="Última saída 08 de Abril"/>
          <HighligthCard 
            type="total"  
            title="Total" 
            amount="R$ 16.141,00" 
            lastTransaction="01 a 16 de Abril"/>
        </HighligthCards>

        <Transactions>
           <Title>Listagem</Title>

           <TransactionList 
              data={data}
              renderItem={({ item }) => <TransactionCard data={item}/>}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: getBottomSpace()
              }}
           />
           
           
        </Transactions>
    </Container>
  )
}