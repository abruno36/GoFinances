import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';

import { Keyboard, Modal, Alert } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { useAuth } from '../../hooks/auth';

import { Button } from '../../components/Form/Button';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import { InputForm } from '../../components/Form/InputForm';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { CategorySelect } from '../CategorySelect';

import { 
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypes
} from './styles';


interface FormData {
    [name: string] : any;

  }

const schema = Yup.object().shape({
  name: Yup
  .string()
  .required('Informe a descrição da transação')
  .min(2, 'A descrição deve ter no mínimo 2 caracteres')
  .matches(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\s]+$/, { message: 'Descrição só aceita letras' }),
  amount: Yup
  .number()
  .typeError('Informe um valor numérico')
  .positive('Infome um valor positivo')
  .required('Informe o valor da transação')
})

export function Register() {

    const [category, setCategory] = useState({
      key: 'category',
      name: 'Categoria',
    });

    type NavigationProps = {
      navigate:(screen:string) => void;
    }

    const { user} = useAuth();

    const navigation = useNavigation<NavigationProps>();

    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  
    const { control, handleSubmit, reset, formState: { errors } } = useForm({
      resolver: yupResolver(schema)
    });
  
    function handleTransactionTypeSelect(type: 'positive' | 'negative') {
      setTransactionType(type);
    }
  
    function handleCloseSelectCategoryModal() {
      setCategoryModalOpen(false);
    }
  
    function handleOpenSelectCategoryModal() {
      setCategoryModalOpen(true);
    }
  
    async function handleRegister(form: FormData) {
      if (!transactionType) {
        return Alert.alert('Selecione o tipo de transação');
      }
  
      if (category.key === 'category') {
        return Alert.alert('Selecione uma categoria');
      }
  
      const newTransaction = {
        id: String(uuid.v4()),
        name: form.name,
        amount: form.amount,
        type: transactionType,
        category: category.key,
        date: new Date()
      }
  
      try {
        const dataKey = `@gofinances:transactions_user:${user.id}`;
        const data = await AsyncStorage.getItem(dataKey);
        const currentData = data ? JSON.parse(data) : [];
        const dataFormated = [
          ...currentData,
          newTransaction
        ]
        await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormated));
        reset();
        setTransactionType('');
        setCategory({
          key: 'category',
          name: 'Categoria'
        });

        navigation.navigate('Listagem');

      } catch (error) {
        console.log(error);
        Alert.alert("Não foi possível salvar");
      }
    }

  
    return (
      <TouchableWithoutFeedback 
          onPress={Keyboard.dismiss}
          containerStyle={{ flex: 1}}
          style={{flex: 1}}>
        <Container>
          <Header>
            <Title>Cadastro</Title>
          </Header>
  
          <Form>
            <Fields>
              <InputForm
                control={control}
                name='name' 
                placeholder="Nome"
                autoCapitalize="sentences"
                autoCorrect={false}
                error={errors.name && errors.name.message}
              />
              <InputForm
                control={control}
                name='amount' 
                placeholder="Valor"
                keyboardType='numeric'
                error={errors.amount && errors.amount.message}
              />
  
              <TransactionTypes>
                <TransactionTypeButton
                  title="Income"
                  type="up"
                  onPress={() => handleTransactionTypeSelect('positive')}
                  isActive={transactionType === 'positive'}
                />
                <TransactionTypeButton
                  title="Outcome"
                  type="down"
                  onPress={() => handleTransactionTypeSelect('negative')}
                  isActive={transactionType === 'negative'}
                />
              </TransactionTypes>
  
              <CategorySelectButton 
                title={category.name}
                onPress={handleOpenSelectCategoryModal}
              />
            </Fields>
  
            <Button 
              title="Enviar" 
              onPress={handleSubmit(handleRegister)}
            />
          </Form>
  
          <Modal
            visible={categoryModalOpen}
          >
            <CategorySelect
              category={category}
              setCategory={setCategory}
              closeSelectCategory={handleCloseSelectCategoryModal}
            />
          </Modal>
  
        </Container>
      </TouchableWithoutFeedback>
    )
  }