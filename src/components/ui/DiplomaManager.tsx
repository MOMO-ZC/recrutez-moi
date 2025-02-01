import { DIPLOMA_FIELD, DIPLOMA_LEVEL } from '@/src/constants/diploma';
import { useThemeColor } from '@/src/hooks/useThemeColor';
import { Diploma, DiplomaManagerProps } from '@/src/types';
import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ThemedText } from '../ThemedText';
import RoundedButton from './RoundedButton';
import { View, TouchableOpacity, TextInput } from 'react-native';
import styled from 'styled-components';
import AutoComplete from 'react-native-autocomplete-input';

const DiplomaManager = (props: DiplomaManagerProps) => {
  const { handleChange, initialDiplomas } = props;
  let diplomaId = 1;
  const DIPLOMA_OPTIONS: Diploma[] = DIPLOMA_FIELD.flatMap((diploma) =>
    DIPLOMA_LEVEL.map((level) => ({
      id: diplomaId++,
      domain: diploma,
      diploma: level,
    }))
  );

  const [query, setQuery] = useState('');
  const [filteredDiploma, setFilteredDiploma] =
    useState<Diploma[]>(DIPLOMA_OPTIONS);
  const [diplomas, setDiplomas] = useState<Diploma[]>(initialDiplomas);

  const handleSearch = (text: string) => {
    setQuery(text);
    if (text.trim() === '') {
      setFilteredDiploma([]);
    } else {
      const filtered = DIPLOMA_OPTIONS.filter(
        (diploma) =>
          diploma.domain.toLowerCase().includes(text.toLowerCase()) ||
          diploma.diploma.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredDiploma(filtered);
    }
  };

  const handleAddDiploma = (selectedDiploma: Diploma) => {
    console.log(selectedDiploma);
    if (
      selectedDiploma &&
      !diplomas.some(
        (s) =>
          s.domain === selectedDiploma.domain &&
          s.diploma === selectedDiploma.diploma
      )
    ) {
      handleChange('diplomas', [...diplomas, selectedDiploma]);
      setDiplomas([...diplomas, selectedDiploma]);
      setQuery('');
    }
  };

  return (
    <AutoCompleteContainer>
      <StyledAutoComplete
        borderColor={useThemeColor({}, 'placeholder')}
        data={filteredDiploma}
        value={query}
        onChangeText={handleSearch}
        placeholder="Search a diploma"
        flatListProps={{
          keyExtractor: (_, i) => i.toString(),
          renderItem: ({ item }) => (
            // @ts-ignore
            <SuggestionItem
              // @ts-ignore
              key={item.id}
              // @ts-ignore
              onPress={() => handleAddDiploma(item)}
            >
              <ThemedText>
                {/* @ts-ignore */}
                {item.domain} | {item.diploma}
              </ThemedText>
            </SuggestionItem>
          ),
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
      {diplomas.map((diploma, index) => (
        <DiplomaWrapper key={diploma.id}>
          <ThemedText>
            {diploma.domain} | {diploma.diploma}
          </ThemedText>
          <IconWrapper>
            <RoundedButton
              size={16}
              color={'transparent'}
              icon={<Feather name="x" size={16} />}
              onPress={() =>
                setDiplomas(diplomas.filter((d) => d.domain !== diploma.domain))
              }
            />
          </IconWrapper>
        </DiplomaWrapper>
      ))}
    </AutoCompleteContainer>
  );
};

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

const IconWrapper = styled(View)`
  justify-content: center;
  align-items: center;
  padding: 2px;
`;

const DiplomaWrapper = styled(View)`
  display: flex;
  flex-direction: row;
`;

export default DiplomaManager;
