import React, { useState, useEffect, useContext } from 'react';

import { ThemeContext, useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';

import Geolocation from 'react-native-geolocation-service';

import {
  Container,
  Header,
  UserLocationContainer,
  UserLocation,
  ButtonsContainer,
  Reload,
  Search,
  Content,
  WeatherImage,
  WeatherUserInfo,
  WeatherUser,
  Spacer,
  WeatherInfoWapper,
  WeatherMaxContainer,
  WeatherMaxText,
  WeatherMinContainer,
  WeatherMinText,
} from './styles';

import Icon from '@expo/vector-icons/Feather';
import { ThemeSwitcher } from '../../components/ThemeSwitcher';

import { IWeather } from '../../interfaces/IWeather';

import { getCurrentLocation, hasPermissionLocation } from '../../utils';

import { getWeatherData } from '../../services/weatherRequest';
import { Loading } from '../../components/Loading';
import { StatusBar } from 'react-native';

export function Home() {
  const navigation = useNavigation();
  const theme = useTheme();
  const { theme: appTheme } = useContext(ThemeContext);

  const [location, setLocation] = useState<Geolocation.GeoPosition | null>(
    null,
  );
  const [weather, setWeather] = useState<IWeather | null>(null);
  const [loading, setLoading] = useState(false);

  const weatherIcon = {
    uri: `http://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`,
  };

  function handleSearchNavigate() {
    //@ts-ignore
    navigation.navigate('Search');
  }

  function getData() {
    getWeatherData(setWeather, setLoading, location);
  }

  useEffect(() => {
    if (hasPermissionLocation()) {
      getCurrentLocation(setLocation);
    }
  }, []);

  useEffect(() => {
    if (location?.coords?.latitude && location?.coords?.longitude) {
      getWeatherData(setWeather, setLoading, location);
    }
  }, [location]);

  return (
    <Container>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle={appTheme === 'light' ? 'dark-content' : 'light-content'}
      />

      {loading ? (
        <Loading close={setLoading} visible={loading} />
      ) : (
        <>
          <Header>
            <UserLocationContainer>
              <Icon name="map-pin" size={22} color={theme.colors.text} />
              {weather && (
                <UserLocation>
                  {`${weather.name}, ${weather.sys.country}`}
                </UserLocation>
              )}
            </UserLocationContainer>
            <ButtonsContainer>
              <Search onPress={handleSearchNavigate}>
                <Icon name="search" size={22} color={theme.colors.text} />
              </Search>

              <Spacer />

              <Reload onPress={getData}>
                <Icon name="refresh-cw" size={22} color={theme.colors.text} />
              </Reload>

              <Spacer />

              <ThemeSwitcher />
            </ButtonsContainer>
          </Header>

          <Content>
            <WeatherImage source={weatherIcon} />
            {weather?.main.temp && weather?.weather[0].description && (
              <>
                <WeatherUserInfo>
                  {weather?.weather[0].description}
                </WeatherUserInfo>
                <WeatherUser>{weather?.main.temp.toFixed(0)}º</WeatherUser>

                <WeatherInfoWapper>
                  <WeatherMaxContainer>
                    <Icon
                      name="arrow-up-right"
                      size={22}
                      color={theme.colors.weather_Info_text}
                    />
                    <WeatherMaxText>
                      max {weather?.main.temp_max.toFixed(0)}º
                    </WeatherMaxText>
                  </WeatherMaxContainer>

                  <WeatherMinContainer>
                    <Icon
                      name="arrow-down-right"
                      size={22}
                      color={theme.colors.weather_Info_text}
                    />
                    <WeatherMinText>
                      min {weather?.main.temp_min.toFixed(0)}º
                    </WeatherMinText>
                  </WeatherMinContainer>
                </WeatherInfoWapper>
              </>
            )}
          </Content>
        </>
      )}
    </Container>
  );
}
