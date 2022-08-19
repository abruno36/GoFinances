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
              <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/5222757?v=4'}}/>
              <User>
                <UserGreeting>Olá,</UserGreeting>
                <UserName>Bruno</UserName>
              </User>
            </UserInfo>
            <Icon name="power"/>
          </UserWrapper>
        </Header>
    </Container>
  )
}