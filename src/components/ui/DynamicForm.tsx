import React, { useEffect, useState } from 'react';
import {
  TextInput,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AutoComplete from 'react-native-autocomplete-input';
import styled from 'styled-components';
import ButtonText from './ButtonText';
import { useThemeColor } from '@/src/hooks/useThemeColor';
import {
  Language as LanguageType,
  Skill as SkillType,
  Experience as ExperienceType,
  Diploma,
} from '@/src/types';
import SkillManager from './SkillManager';
import DiplomaManager from './DiplomaManager';
import LanguageManager from './LanguageManager';
import ExperienceManager from './ExperienceManager';
import { ThemedText } from '../ThemedText';

interface Option {
  value: string | number;
  label: string;
}
type FormFieldType =
  | 'text'
  | 'number'
  | 'email'
  | 'select'
  | 'password'
  | 'longText'
  | 'skills'
  | 'languages'
  | 'diploma'
  | 'experience'
  | 'radio';

export interface FormField<T extends FormFieldType = FormFieldType> {
  name: string;
  label: string;
  placeholder?: string;
  type: T;
  options?: Option[];
  value?: T extends 'languages'
    ? LanguageType[]
    : T extends 'skills'
      ? SkillType[]
      : T extends 'select'
        ? string
        : T extends 'number'
          ? number
          : T extends 'experience'
            ? ExperienceType[]
            : T extends 'diploma'
              ? Diploma[]
              : T extends 'longText' | 'text' | 'email' | 'radio' | 'password'
                ? string
                : never;
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
  const fieldValue = values[field.name] ?? field.value ?? '';

  if (field.type === 'skills') {
    return (
      <View key={index}>
        <StyledLabel>{field.label}</StyledLabel>
        <SkillManager key={index} handleChange={handleChange} />
      </View>
    );
  }

  if (field.type === 'languages') {
    return (
      <View key={index}>
        <StyledLabel>{field.label}</StyledLabel>
        <LanguageManager handleChange={handleChange} />
      </View>
    );
  }
  if (field.type === 'diploma') {
    return (
      <View key={index}>
        <StyledLabel>{field.label}</StyledLabel>
        <DiplomaManager
          handleChange={handleChange}
          initialDiplomas={(field.value as Diploma[]) ?? []}
        />
      </View>
    );
  }
  if (field.type === 'experience') {
    return (
      <View key={index}>
        <StyledLabel>{field.label}</StyledLabel>
        <ExperienceManager handleChange={handleChange} />
      </View>
    );
  }

  switch (field.type) {
    case 'text':
    case 'number':
    case 'password':
      return (
        <StyledInputContainer key={index}>
          <StyledLabel>{field.label}</StyledLabel>
          <StyledInput
            borderColor={colors.borderColor}
            placeholder={field.placeholder ?? field.label}
            placeholderTextColor={colors.placeHolderColor}
            secureTextEntry={field.type === 'password'}
            keyboardType={field.type === 'number' ? 'numeric' : 'default'}
            value={fieldValue}
            onChangeText={(value) => handleChange(field.name, value)}
          />
        </StyledInputContainer>
      );
    case 'email':
      return (
        <StyledInputContainer key={index}>
          <StyledLabel>{field.label}</StyledLabel>
          <StyledInput
            borderColor={colors.borderColor}
            placeholder={field.placeholder ?? field.label}
            placeholderTextColor={colors.placeHolderColor}
            secureTextEntry={false}
            keyboardType="email-address"
            autoCapitalize="none"
            value={fieldValue}
            onChangeText={(value) =>
              handleChange(field.name, value.toLowerCase())
            }
          />
        </StyledInputContainer>
      );
    case 'longText':
      return (
        <StyledInputContainer key={index}>
          <StyledLabel>{field.label}</StyledLabel>
          <StyledInput
            borderColor={colors.borderColor}
            placeholder={field.placeholder ?? field.label}
            placeholderTextColor={colors.placeHolderColor}
            secureTextEntry={false}
            multiline={true}
            numberOfLines={4}
            value={fieldValue}
            onChangeText={(value) => handleChange(field.name, value)}
            size={300}
          />
        </StyledInputContainer>
      );
    case 'select':
      return (
        <StyledInputContainer key={index}>
          <StyledLabel>{field.label}</StyledLabel>
          <StyledPicker
            borderColor={colors.borderColor}
            selectedValue={fieldValue}
            onValueChange={(value) => handleChange(field.name, value)}
          >
            {field.options?.map((option, i) => (
              <StyledPickerItem
                key={i}
                label={option.label}
                value={option.value}
              />
            ))}
          </StyledPicker>
        </StyledInputContainer>
      );
    case 'radio':
      return (
        <StyledInputContainer key={index}>
          <StyledLabel>{field.label}</StyledLabel>
          {field.options?.map((option, i) => (
            <Radio key={i} selected={fieldValue === option.value}>
              <RadioButton
                selected={fieldValue === option.value}
                onPress={() => handleChange(field.name, option.value)}
              />
              <ThemedText>{option.label}</ThemedText>
            </Radio>
          ))}
        </StyledInputContainer>
      );
    default:
      return null;
  }
};

export const DynamicForm: React.FC<DynamicFormProps> = ({
  formStructure,
  label,
  onSubmit,
}) => {
  const colors = {
    borderColor: useThemeColor({}, 'placeholder'),
    placeHolderColor: useThemeColor({}, 'placeholder'),
  };

  const [formValues, setFormValues] = useState<{ [key: string]: any }>({});
  const [previousFormStructure, setPreviousFormStructure] =
    useState<string>(''); // Store serialized structure

  useEffect(() => {
    const serializedStructure = JSON.stringify(formStructure); // Convert to string for comparison

    if (serializedStructure !== previousFormStructure) {
      setPreviousFormStructure(serializedStructure); // Update reference
      const newValues = formStructure.reduce<{ [key: string]: any }>(
        (acc, field) => {
          acc[field.name] = field.value ?? '';
          return acc;
        },
        {}
      );
      setFormValues(newValues); // Reset form values
    }
  }, [formStructure]);

  const handleChange = (name: string, value: any) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value, // Only update the specific field
    }));
  };

  const handleSubmit = () => {
    onSubmit(formValues);
  };

  return (
    <KeyboardView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StyledForm>
        {formStructure.map((field, index) =>
          renderFormField(colors, field, index, handleChange, formValues)
        )}
        <ButtonContainer>
          <StyledButton label={label} onPress={handleSubmit} />
        </ButtonContainer>
      </StyledForm>
    </KeyboardView>
  );
};

const KeyboardView = styled(KeyboardAvoidingView)`
  flex: 1;
`;

const StyledForm = styled(View)`
  flex: 1;
  padding: 8px;
  width: 340px;
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

const StyledInput = styled(TextInput)<{ borderColor: string; size?: number }>`
  border: 1px solid ${(props) => props.borderColor};
  border-radius: 5px;
  padding: 8px;
  font-size: 16px;
  height: ${(props) => props.size ?? 48}px;
`;

const StyledPicker = styled(Picker)<{ borderColor: string }>`
  border: 1px solid ${(props) => props.borderColor};
  border-radius: 5px;
  font-size: 16px;
`;

const StyledPickerItem = Picker.Item;

const StyledButton = styled(ButtonText)`
  padding: 16px;
  border-radius: 5px;
  align-items: center;
`;

const Radio = styled(View)<{ selected: boolean }>`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

const RadioButton = styled(TouchableOpacity)<{ selected: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  border: 1px solid #333;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
  background-color: ${(props) => (props.selected ? '#4E32EF' : '#D9D9D9')};
`;

export default DynamicForm;
