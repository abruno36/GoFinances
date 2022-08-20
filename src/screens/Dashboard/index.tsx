import React from 'react';

import { 
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon
  
} from './styles';

export function Dashboard() {
  return (
    <Container>
       <Header>
          <UserWrapper>
            <UserInfo>
              <Photo source={{ uri: 'https://img.freepik.com/fotos-gratis/contador-que-calcula-o-lucro-com-graficos-de-analise-financeira_74855-4937.jpg?w=1380&t=st=1660958744~exp=1660959344~hmac=7e0c290e03465023f103173f4dddbfc54686cc905206a96a1b89d9248a8ae022'}}/>
              <User>
                <UserGreeting>Go Finances,</UserGreeting>
                <UserName>Seja Bem Vindo(a)!</UserName>
              </User>
            </UserInfo>
            <Icon name="power"/>
          </UserWrapper>
        </Header>
    </Container>
  )
}