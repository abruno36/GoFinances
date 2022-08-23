import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard, Modal, TouchableWithoutFeedback, Alert } from 'react-native';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

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
  .matches(/^[aA-zZ\s]+$/, { message: 'Descrição só aceita letras' }),
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
    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  
    const { control, handleSubmit, formState: { errors } } = useForm({
      resolver: yupResolver(schema)
    });
  
    function handleTransactionTypeSelect(type: 'up' | 'down') {
      setTransactionType(type);
    }
  
    function handleCloseSelectCategoryModal() {
      setCategoryModalOpen(false);
    }
  
    function handleOpenSelectCategoryModal() {
      setCategoryModalOpen(true);
    }
  
    function handleRegister(form: FormData) {
      if (!transactionType) {
        return Alert.alert('Selecione o tipo de transação');
      }
  
      if (category.key === 'category') {
        return Alert.alert('Selecione uma categoria');
      }
  
      const data = {
        name: form.name,
        amount: form.amount,
        transactionType,
        category: category.key
      }
  
      console.log(data);
    }
  
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                placeholder="Preço"
                keyboardType='numeric'
                error={errors.amount && errors.amount.message}
              />
  
              <TransactionTypes>
                <TransactionTypeButton
                  title="Income"
                  type="up"
                  onPress={() => handleTransactionTypeSelect('up')}
                  isActive={transactionType === 'up'}
                />
                <TransactionTypeButton
                  title="Outcome"
                  type="down"
                  onPress={() => handleTransactionTypeSelect('down')}
                  isActive={transactionType === 'down'}
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