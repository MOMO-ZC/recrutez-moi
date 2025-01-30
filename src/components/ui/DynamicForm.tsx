import React, { useEffect, useState } from 'react';
import {
  TextInput,
  TouchableOpacity,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AutoComplete from 'react-native-autocomplete-input';
import styled from 'styled-components';
import ButtonText from './ButtonText';
import { useThemeColor } from '@/src/hooks/useThemeColor';
import SkillDisplayer from './SkillDisplayer';
import { Language as LanguageType, Skill as SkillType } from '@/src/types';
import { SKILLS } from '@/src/constants/skills';
import Skill from './Skill';
import { useSkill } from '@/src/hooks/useSkill';
import { LANGUAGE, LANGUAGE_LEVEL } from '@/src/constants/language';
import { ThemedText } from '../ThemedText';
import LanguageDisplayer from './LanguageDisplayer';
import { useLanguage } from '@/src/hooks/useLanguage';
import Language from './Language';

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
  | 'languages';

export interface FormField<T extends FormFieldType = FormFieldType> {
  name: string;
  label: string;
  placeholder?: string;
  type: T;
  options?: Option[];
  value?: T extends 'languages' ? LanguageType[] : T extends 'skills' ? SkillType[] : T extends 'select' ? string : T extends 'number' ? number : T extends 'longText' | 'text' | 'email' ? string : never;
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
        <SkillManager key={index} handleChange={handleChange}/>
      </View>
    );
  }

  if (field.type === 'languages') {
    return (
      <View key={index}>
        <StyledLabel>{field.label}</StyledLabel>
        <LanguageManager handleChange={handleChange}/>
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
  const [previousFormStructure, setPreviousFormStructure] = useState<string>(''); // Store serialized structure


  useEffect(() => {
    const serializedStructure = JSON.stringify(formStructure); // Convert to string for comparison

    if (serializedStructure !== previousFormStructure) {
      setPreviousFormStructure(serializedStructure); // Update reference
      const newValues = formStructure.reduce<{ [key: string]: any }>((acc, field) => {
        acc[field.name] = field.value ?? '';
        return acc;
      }, {});
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

interface ManagerProps {
  handleChange: (name: string, value: any) => void;
}

const SkillManager = (props: ManagerProps) => {
  const { handleChange } = props;
  const [query, setQuery] = useState('');
  const [filteredSkills, setFilteredSkills] = useState<SkillType[]>(SKILLS);
  const { addSkill, skills } = useSkill();

  const handleSearch = (text: string) => {
    setQuery(text);

    if (text.trim() === '') {
      setFilteredSkills([]);
    } else {
      const filtered = SKILLS.filter((skill) =>
        skill.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredSkills(filtered);
    }
  };

  const handleAddSkill = (selectedSkill: string) => {
    if (selectedSkill && !skills.some((s) => s.name === selectedSkill)) {
      const skillToAdd = SKILLS.find((skill) => skill.name === selectedSkill);
      if (skillToAdd) {
        handleChange('skills', [...skills, skillToAdd]);
        addSkill(skillToAdd);
        setQuery('');
      }
    }
  };

  return (
    <SkillPickerContainer>
      <SkillAutoComplete
        borderColor={useThemeColor({}, 'placeholder')}
        data={filteredSkills}
        value={query}
        onChangeText={handleSearch}
        placeholder="Search a skill"
        flatListProps={{
          keyExtractor: (_, i) => i.toString(),
          renderItem: ({ item }) => (
            // @ts-ignore
            <SuggestionItem onPress={() => handleAddSkill(item.name)}>
              {/* @ts-ignore */}
              <Skill skill={item} />
            </SuggestionItem>
          ),
          numColumns: 2,
          columnWrapperStyle: {
            justifyContent: 'flex-start',
          },
          style: {
            backgroundColor: useThemeColor({}, 'ui-buttons'),
            borderWidth: 0,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            borderRadius: 5,
          },
        }}
        inputContainerStyle={{
          borderWidth: 0,
        }}
        listContainerStyle={{
          flexWrap: 'wrap',
          flexDirection: 'row',
          justifyContent: 'flex-start',
        }}
        hideResults={query.trim() === ''}
        renderTextInput={(props) => (
          <AutoCompleteInput
            borderColor={useThemeColor({}, 'placeholder')}
            {...props}
          />
        )}
      />

      <SkillDisplayer skills={skills} editing={true} />
    </SkillPickerContainer>
  );
};


const LanguageManager = (props: ManagerProps) => {
  const { handleChange } = props;
  const LANGUAGE_OPTIONS: LanguageType[] = LANGUAGE.flatMap(lang =>
    LANGUAGE_LEVEL.map(level => ({ name: lang, level }))
  );

  const [query, setQuery] = useState('');
  const [filteredLanguage, setFilteredLanguage] = useState<LanguageType[]>(LANGUAGE_OPTIONS);
  const { addLanguage, languages } = useLanguage();

const handleSearch = (text: string) => {
  setQuery(text);
  if (text.trim() === '') {
    setFilteredLanguage([]);
  } else {
    const filtered = LANGUAGE_OPTIONS.filter((lang) =>
      lang.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredLanguage(filtered);
  }
};


const handleAddLanguage = (selectedLanguage: LanguageType) => {
    if (selectedLanguage && !languages.some((s) => s.name === selectedLanguage.name)) {
      handleChange('languages', [...languages, selectedLanguage]);
      addLanguage(selectedLanguage);
      setQuery('');
    }
};
  return (
    <LanguagePickerContainer>
      <LanguageAutoComplete
        borderColor={useThemeColor({}, 'placeholder')}
        data={filteredLanguage}
        value={query}
        onChangeText={handleSearch}
        placeholder="Search a language"
        flatListProps={{
          keyExtractor: (_, i) => i.toString(),
          renderItem: ({ item }) => (
            // @ts-ignore
            <SuggestionItem onPress={() => handleAddLanguage(item)}>
              {/* @ts-ignore */}
              <Language language={item}/>
            </SuggestionItem>
          ),
          numColumns: 4,
          columnWrapperStyle: {
            justifyContent: 'flex-start',
          },
          style: {
            backgroundColor: useThemeColor({}, 'ui-buttons'),
            borderWidth: 0,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            borderRadius: 5,
          },
        }}
        inputContainerStyle={{
          borderWidth: 0,
        }}
        listContainerStyle={{
          flexWrap: 'wrap',
          flexDirection: 'row',
          justifyContent: 'flex-start',
        }}
        hideResults={query.trim() === ''}
        renderTextInput={(props) => (
          <AutoCompleteInput
            borderColor={useThemeColor({}, 'placeholder')}
            {...props}
          />
        )}
      />
      <LanguageDisplayer languages={languages} editing={true} />
    </LanguagePickerContainer>

  )
};

const KeyboardView = styled(KeyboardAvoidingView)`
  flex: 1;
`;

const StyledForm = styled(View)`
  flex: 1;
  padding: 8px;
  width: 340px;
`;

const AutoCompleteInput = styled(TextInput)<{ borderColor: string }>`
  border: 1px solid ${(props) => props.borderColor};
  border-radius: 5px;
  padding: 8px;
  font-size: 16px;
  background-color: none;
  height: 48px;
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
  padding: 8px;
  font-size: 16px;
`;

const SuggestionItem = styled(TouchableOpacity)`
  margin: 4px;
`;

const SkillAutoComplete = styled(AutoComplete)<{ borderColor: string }>`
  border: 1px solid ${(props) => props.borderColor};
  border-radius: 5px;
  padding: 8px;
  font-size: 16px;
  margin-bottom: 16px;
  height: 48px;
  background-color: none;
`;

const LanguageAutoComplete = styled(AutoComplete)<{ borderColor: string }>`
  border: 1px solid ${(props) => props.borderColor};
  border-radius: 5px;
  padding: 8px;
  font-size: 16px;
  margin-bottom: 16px;
  height: 48px;
  background-color: none;
`;



const StyledPickerItem = Picker.Item;

const StyledButton = styled(ButtonText)`
  padding: 16px;
  border-radius: 5px;
  align-items: center;
`;

const SkillPickerContainer = styled(View)``;

const LanguagePickerContainer = styled(View)`
margin-bottom: 16px;
  `;

export default DynamicForm;
