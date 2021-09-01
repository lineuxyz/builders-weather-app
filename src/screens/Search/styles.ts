import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const BackButton = styled.TouchableWithoutFeedback`
  margin: 12px 0;
`;

export const BackButtonWapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const BackButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.text};
`;

export const Header = styled.View`
  height: 60px;
  width: 100%;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: 0 15px;
  margin-bottom: 22px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(18)}px;
`;

export const Content = styled.View`
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  flex: 1;
  width: 100%;
  padding: 0 15px;
`;

export const WeatherContent = styled.View`
  flex: 1;
  align-items: center;
  margin-top: 56px;
`;

export const WeatherCity = styled.Text`
  font-size: ${RFValue(26)}px;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
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
