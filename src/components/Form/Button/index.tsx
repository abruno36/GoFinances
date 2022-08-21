import React from "react";
import { TouchableOpacityProps, TouchableOpacity } from "react-native";

import { Container, Title } from './styles';

interface Props extends TouchableOpacityProps{
    title: string;
}

export function Button({ title, ...rest} : Props){
    return (
        <TouchableOpacity >
            <Container {...rest} activeOpacity={0.7} >
                <Title>
                    {title}
                </Title>
            </Container>
        </TouchableOpacity>
    )
}