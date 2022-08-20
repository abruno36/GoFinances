import React from 'react';
import { HighligthCard } from '../../components/HighligthCard';

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
  HighligthCards
  
} from './styles';

export function Dashboard() {
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
    </Container>
  )
}