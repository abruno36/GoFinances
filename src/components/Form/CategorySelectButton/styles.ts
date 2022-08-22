import styled from 'styled-components/native';
import { RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';


export const Container = styled.TouchableOpacity.attrs({
    activeOpacity: 0.7
})`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: 5px;
    background-color: ${({theme}) => theme.colors.shape};
    padding: 18px 16px
`;

export const Category = styled.Text`
    font-size: ${RFValue(14)}px;
    font-family: ${({theme}) => theme.fonts.regular};
    color: ${({theme}) => theme.colors.text_dark};
`;

export const Icon = styled(Feather)`
    font-size: ${RFValue(20)}px;
    color: ${({theme}) => theme.colors.text};
`;

