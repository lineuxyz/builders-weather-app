import styled from "styled-components/native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";
import { RectButton } from "react-native-gesture-handler";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
  flex: 1;
`;

export const Header = styled.View`
  height: 80px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin-top: ${getStatusBarHeight() + 42}px;
  padding: 0 15px;
`;

export const UserLocationContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const SearchBar = styled.TextInput`
  width: 220px;
  height: 28px;

  background-color: #f1f1f1;

  border-radius: 5px;

  padding: 5px;
  margin-left: 4px;
`;

export const UserLocation = styled.Text`
  margin-left: 4px;
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.text};
`;


export const ButtonsContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Reload = styled.TouchableWithoutFeedback`
  margin: 0 8px;
`;

export const Search = styled.TouchableWithoutFeedback`
  
`;

export const Content = styled.View`
  flex: 1;
  align-items: center;
  margin-top: 56px;
`;

export const WeatherImage = styled.Image`
  align-self: center;

  width: 200px;
  height: 200px;
`;

export const WeatherUserInfo = styled.Text`
  text-align: center;
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.text};
  text-transform: capitalize;
`;

export const WeatherUser = styled.Text`
  font-size: ${RFValue(56)}px;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
`;

export const Spacer = styled.View`
  margin: 0 6px;
`;

export const WeatherInfoWapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-top: 44px;
`;

export const WeatherMaxContainer = styled.View`
  width: 105px;
  height: 60px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: 0 5px;

  background-color: ${({ theme }) => theme.colors.weather_info_background};
  border-radius: 5px;

  margin-right: 8px;
`;

export const WeatherMaxText = styled.Text`
  color: ${({ theme }) => theme.colors.weather_Info_text};
  font-size: ${RFValue(16)}px;
`;

export const WeatherMinContainer = styled.View`
  width: 105px;
  height: 60px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: 0 5px;

  background-color: ${({ theme }) => theme.colors.weather_info_background};
  border-radius: 5px;
`;

export const WeatherMinText = styled.Text`
  color: ${({ theme }) => theme.colors.weather_Info_text};
  font-size: ${RFValue(16)}px;
`;
