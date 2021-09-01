import React, { useCallback, useContext, useRef, useState } from 'react';
import { Alert, StatusBar } from 'react-native';

import Icon from '@expo/vector-icons/Feather';

import { useNavigation } from '@react-navigation/native';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';

import { ThemeSwitcher } from '../../components/ThemeSwitcher';

import { api } from '../../services/api';
import * as Yup from 'yup';

import { OPEN_WEATHER_API_KEY } from '@env';

import {
  Container,
  BackButton,
  BackButtonWapper,
  BackButtonText,
  Header,
  Title,
  Content,
  WeatherContent,
  WeatherCity,
  WeatherImage,
  WeatherUserInfo,
  WeatherUser,
} from './styles';
import { getValidationErrors } from '../../utils/getValidationErrors';
import { ThemeContext } from 'styled-components';

import { IWeather } from '../../interfaces/IWeather';
import { Input } from '../../components/Input';
import { Loading } from '../../components/Loading';

interface ISearchForm {
  search: string;
}

export function Search() {
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();
  const { theme, colors } = useContext(ThemeContext);

  const [weather, setWeather] = useState<null | IWeather>(null);
  const [loading, setLoading] = useState(false);

  const weatherIcon = {
    uri: `http://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`,
  };

  function handleGoBack() {
    navigation.goBack();
  }

  const handleSearch = useCallback(async (data: ISearchForm, { reset }) => {
    try {
      setLoading(true);
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        search: Yup.string().required('Digite o nome de uma cidade'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const response = await api.get(
        `/weather?q=${data.search}&appid=${OPEN_WEATHER_API_KEY}&units=metric&lang=pt_br`,
      );

      setWeather(response.data);
      setLoading(false);
      reset();
    } catch (err) {
      setLoading(false);
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }

      Alert.alert(
        'Erro na busca',
        'Ocorreu um erro ao buscar uma cidade, por favor, tente novamente.',
      );
    }
  }, []);

  return (
    <Container>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle={theme === 'light' ? 'dark-content' : 'light-content'}
      />

      <BackButton onPress={handleGoBack}>
        <BackButtonWapper>
          <Icon name="chevron-left" size={34} color={colors.text} />
          <BackButtonText>Voltar</BackButtonText>
        </BackButtonWapper>
      </BackButton>

      <Header>
        <Title>Busque por cidades</Title>
        <ThemeSwitcher />
      </Header>

      <Content>
        <Form ref={formRef} onSubmit={handleSearch}>
          <Input
            name="search"
            icon="search-location"
            placeholder="Digite uma cidade"
            // returnKeyType=""
            onSubmitEditing={() => {
              formRef.current?.submitForm();
            }}
          />
        </Form>

        {loading ? (
          <Loading visible={loading} close={setLoading} />
        ) : (
          <>
            {weather?.main.temp && weather?.weather[0].description && (
              <WeatherContent>
                <WeatherCity>{weather.name}</WeatherCity>

                <WeatherImage source={weatherIcon} />
                {weather?.main.temp && weather?.weather[0].description && (
                  <>
                    <WeatherUserInfo>
                      {weather?.weather[0].description}
                    </WeatherUserInfo>
                    <WeatherUser>{weather?.main.temp.toFixed(0)}º</WeatherUser>
                  </>
                )}
              </WeatherContent>
            )}
          </>
        )}
      </Content>
    </Container>
  );
}
