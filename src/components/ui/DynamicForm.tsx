import React, { useState } from 'react';
import { TextInput, TouchableOpacity, Text, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styled from 'styled-components';
import { ThemedText } from '../ThemedText';
import ButtonText from './ButtonText';
import { useThemeColor } from '@/src/hooks/useThemeColor';

interface Option {
  value: string | number;
  label: string;
}

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'password';
  options?: Option[];
}

interface DynamicFormProps {
  formStructure: FormField[];
  label: string;
  onSubmit: (formData: { [key: string]: any }) => void;
}

const renderFormField = (
  colors: { borderColor: string; placeHolderColor: string },
  field: FormField,
  index: number,
  handleChange: (name: string, value: any) => void,
  values: { [key: string]: any }
) => {
  switch (field.type) {
    case 'text':
    case 'number':
    case 'password':
      return (
        <StyledInputContainer key={index}>
          <StyledLabel>{field.label}</StyledLabel>
          <StyledInput
            borderColor={colors.borderColor} 
            placeholder={field.label}
            placeholderTextColor={colors.placeHolderColor}
            secureTextEntry={field.type === 'password'}
            keyboardType={field.type === 'number' ? 'numeric' : 'default'}
            value={values[field.name] || ''}
            onChangeText={(value) => handleChange(field.name, value)}
          />
        </StyledInputContainer>
      );
    case 'select':
      return (
        <StyledInputContainer key={index}>
          <StyledLabel>{field.label}</StyledLabel>
          <StyledPicker
            borderColor={colors.borderColor}
            selectedValue={values[field.name] || ''}
            onValueChange={(value) => handleChange(field.name, value)}
          >
            {field.options?.map((option, i) => (
              <StyledPickerItem key={i} label={option.label} value={option.value} />
            ))}
          </StyledPicker>
        </StyledInputContainer>
      );
    default:
      return null;
  }
};

export const DynamicForm: React.FC<DynamicFormProps> = ({ formStructure, label, onSubmit }) => {
  const colors = {
    borderColor: useThemeColor({}, 'placeholder'),
    placeHolderColor: useThemeColor({}, 'placeholder'),
  };
  
  const [formValues, setFormValues] = useState<{ [key: string]: any }>({});

  const handleChange = (name: string, value: any) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = () => {
    onSubmit(formValues);
  };

  return (
    <KeyboardView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
    <StyledForm>
      {formStructure.map((field, index) => renderFormField(colors, field, index, handleChange, formValues))}
      <ButtonContainer>
        <StyledButton label={label} onPress={handleSubmit}/>
      </ButtonContainer>
    </StyledForm>
    </KeyboardView>
  );
};



const KeyboardView = styled(KeyboardAvoidingView)`
  flex: 1;
`;

const Scroll = styled(ScrollView)`
flexGrow: 1;
`

const StyledForm = styled(View)`
  flex: 1;
  padding: 16px;

`;

const ButtonContainer = styled(View)`
  margin-top: 16px;
  justify-content: center;
  align-items: center;
`;

const StyledInputContainer = styled(View)`
  margin-bottom: 16px;
`;

const StyledLabel = styled(Text)`
  font-size: 16px;
  margin-bottom: 8px;
  color: #333;
`;

const StyledInput = styled(TextInput)<{ borderColor: string }>`

  border: 1px solid ${(props) => props.borderColor};
  border-radius: 5px;
  padding: 8px;
  font-size: 16px;

`;

const StyledPicker = styled(Picker)<{ borderColor: string }>`
  border: 1px solid ${(props) => props.borderColor};
  border-radius: 5px;
  padding: 8px;
  font-size: 16px;
`;

const StyledPickerItem = Picker.Item;

const StyledButton = styled(ButtonText)`
  padding: 16px;
  border-radius: 5px;
  align-items: center;
`;


export default DynamicForm;
