import { getLanguages } from '@/src/api/languages';
import { useLanguage } from '@/src/hooks/useLanguage';
import { useThemeColor } from '@/src/hooks/useThemeColor';
import { ManagerProps, Language as LanguageType } from '@/src/types';
import { useState, useEffect } from 'react';
import { View, TouchableOpacity, TextInput } from 'react-native';
import styled from 'styled-components';
import LanguageDisplayer from './LanguageDisplayer';
import Language from './Language';
import AutoComplete from 'react-native-autocomplete-input';

const LanguageManager = (props: ManagerProps) => {
  const { handleChange } = props;

  const [LANGUAGE_OPTIONS, setLANGUAGE_OPTIONS] = useState<LanguageType[]>([]);
  const [query, setQuery] = useState('');
  const [filteredLanguage, setFilteredLanguage] =
    useState<LanguageType[]>(LANGUAGE_OPTIONS);
  const { addLanguage, languages } = useLanguage();

  useEffect(() => {
    const loadLanguages = async () => {
      const languagesData = await getLanguages();
      setLANGUAGE_OPTIONS(languagesData);
    };
    loadLanguages();
  }, []);

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
    if (
      selectedLanguage &&
      !languages.some((s) => s.name === selectedLanguage.name)
    ) {
      const languageToAdd = LANGUAGE_OPTIONS.find(
        (language) => language.name === selectedLanguage.name
      );
      if (languageToAdd) {
        handleChange('languages', [...languages, languageToAdd]);
        addLanguage(selectedLanguage);
        setQuery('');
      }
    }
  };
  return (
    <AutoCompleteContainer>
      <StyledAutoComplete
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
              <Language language={item} />
            </SuggestionItem>
          ),
          numColumns: 3,
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
    </AutoCompleteContainer>
  );
};

export default LanguageManager;

const StyledAutoComplete = styled(AutoComplete)<{ borderColor: string }>`
  border: 1px solid ${(props) => props.borderColor};
  border-radius: 5px;
  padding: 8px;
  font-size: 16px;
  margin-bottom: 16px;
  height: 48px;
  background-color: none;
`;

const AutoCompleteContainer = styled(View)`
  margin-bottom: 16px;
`;
const SuggestionItem = styled(TouchableOpacity)`
  margin: 4px;
`;

const AutoCompleteInput = styled(TextInput)<{ borderColor: string }>`
  border: 1px solid ${(props) => props.borderColor};
  border-radius: 5px;
  padding: 8px;
  font-size: 16px;
  background-color: none;
  height: 48px;
`;
