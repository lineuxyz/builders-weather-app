import styled, { css } from 'styled-components/native';
import FeatherIcon from '@expo/vector-icons/FontAwesome5';

interface ContainerProps {
  isError: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 60px;
  padding: 0 8px;
  background: ${({ theme }) => theme.colors.input_background};
  margin-bottom: 8px;

  border-radius: 5px;
  flex-direction: row;
  align-items: center;
  ${({ isError }) =>
    isError &&
    css`
      border-color: #c53030;
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: ${({ theme }) => theme.colors.text};
  font-size: 16px;
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`;
