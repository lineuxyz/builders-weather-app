import { Alert } from 'react-native';

import { api } from './api';

import { OPEN_WEATHER_API_KEY } from '@env';

import Geolocation from 'react-native-geolocation-service';

export async function getWeatherData(
  fillData: (param: any) => void,
  loading: (param: any) => void,
  location: Geolocation.GeoPosition | null,
) {
  loading(true);
  try {
    const { data } = await api.get(
      `/weather?lat=${location?.coords?.latitude}&lon=${location?.coords?.longitude}&appid=${OPEN_WEATHER_API_KEY}&units=metric&lang=pt_br`,
    );
    fillData(data);
  } catch (error) {
    Alert.alert(
      'Erro de conexão',
      'Ocorreu um erro na busca, por favor, tente novamente.',
    );
  }

  loading(false);
}
