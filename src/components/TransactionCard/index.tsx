import React from 'react';

import { 
    Container,
    Title,
    Amount,
    Footer,
    Category,
    Icon,
    CategoryName,
    Date
 } from './styles';

 interface Category {
    key: string;
    name: string;
    icon: string;
 }

 interface Props {
    title: string;
    amount: string;
    category: Category;
    date: string;
}

export function TransactionCard({
    title,
    amount,
    category,
    date} : Props){
    return (
       <Container>
            <Title>Desenvolvimento APP</Title>
            <Amount>R$ 15.000,00</Amount>

            <Footer>
                <Category>
                    <Icon name="dollar-sign"/>
                    <CategoryName>Vendas</CategoryName>
                </Category>
                <Date>13/04/2022</Date>
            </Footer>
       </Container> 
    )
}