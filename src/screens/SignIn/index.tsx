import React, { useContext } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { Alert } from 'react-native';

import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';

import { useAuth } from '../../hooks/auth';

import { SignInSocialButton } from '../../components/SignInSocialButton'

import { 
    Container,
    Header,
    TitleWrapper,
    Title,
    SignInTitle,
    Footer,
    FooterWrapper
} from './styles';

export function SignIn(){
    const { SingnInWithGoogle } = useAuth();

    async function handleSingnInWithGoogle(){
        try {
            await SingnInWithGoogle();
            
        } catch (error) {
            console.log(error);
            Alert.alert('Não foi possível conectar a conta Google');
            
        }
    }

    return(
        <Container>
            <Header>
                <TitleWrapper>
                    <LogoSvg 
                        width={RFValue(120)}
                        heigth={RFValue(68)}
                    />
                    <Title>
                           Controle suas {'\n'}
                           finanças de forma {'\n'}
                           muito simples
                    </Title>
                </TitleWrapper>
                <SignInTitle>
                    Faça seu login com {'\n'}
                    uma das contas abaixo
                </SignInTitle>
            </Header>

            <Footer>
                <FooterWrapper>
                    <SignInSocialButton 
                        title="Entrar com Google"
                        svg={GoogleSvg}
                        onPress={handleSingnInWithGoogle}
                    />

                    <SignInSocialButton 
                        title="Entrar com Apple"
                        svg={AppleSvg}
                    />
                </FooterWrapper>
            </Footer>
        </Container>
    );
}