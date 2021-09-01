import React, { useEffect, useRef, memo, useContext } from 'react';
import { TextInputProps } from 'react-native';
import { useField } from '@unform/core';

import { Container, TextInput, Icon } from './styles';

import { ThemeContext } from 'styled-components';

interface IInputProps extends TextInputProps {
  name: string;
  icon: string;
  containerStyle?: {};
}

interface IInputReference {
  value: string;
}

function InputComponent({
  name,
  icon,
  containerStyle = {},
  ...rest
}: IInputProps) {
  const { theme, colors } = useContext(ThemeContext);

  const inputRef = useRef<any>(null);

  const { registerField, defaultValue = '', fieldName, error } = useField(name);
  const inputValueRef = useRef<IInputReference>({ value: defaultValue });

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(value) {
        inputValueRef.current.value = value;
        inputRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container style={containerStyle} isError={!!error}>
      <Icon name={icon} size={20} color={colors.text} />
      <TextInput
        ref={inputRef}
        keyboardAppearance={theme === 'light' ? 'light' : 'dark'}
        placeholderTextColor={colors.text}
        defaultValue={defaultValue}
        onChangeText={value => {
          inputValueRef.current.value = value;
        }}
        {...rest}
      />
    </Container>
  );
}

export const Input = memo(InputComponent);
