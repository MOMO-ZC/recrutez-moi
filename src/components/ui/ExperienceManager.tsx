import { TextInput, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';
import ExperienceDisplayer from './ExperienceDisplayer';
import { useEffect, useState } from 'react';
import { useJobOfferExperience } from '@/src/hooks/useJobOfferExperience';
import { getExperiences } from '@/src/api/experiences';
import { ManagerProps, Experience as ExperienceType } from '@/src/types';
import { useThemeColor } from '@/src/hooks/useThemeColor';
import AutoComplete from 'react-native-autocomplete-input';
import Experience from './Experience';
import { MOCK_EXPERIENCES } from '@/src/constants/experiences';

const ExperienceManager = (props: ManagerProps) => {
  const [EXPERIENCES, setEXPERIENCES] = useState<ExperienceType[]>([]);

  const { handleChange } = props;
  const [query, setQuery] = useState('');
  const [filteredExperiences, setFilteredExperiences] =
    useState<ExperienceType[]>(EXPERIENCES);
  const { addExperience, experiences } = useJobOfferExperience();

  useEffect(() => {
    const loadExperiences = async () => {
      // const experiencesData = await getExperiences();
      // setEXPERIENCES(experiencesData);
      setEXPERIENCES(MOCK_EXPERIENCES);
    };

    loadExperiences();
  }, []);

  useEffect(() => {
    if (EXPERIENCES.length > 0) {
      setFilteredExperiences(EXPERIENCES);
    }
  }, [EXPERIENCES]);

  const handleSearch = (text: string) => {
    setQuery(text);
    if (text.trim() === '') {
      setFilteredExperiences(EXPERIENCES ?? []);
    } else {
      const filtered = EXPERIENCES.filter((experience) =>
        experience.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredExperiences(filtered);
    }
  };

  const handleAddExperience = (selectedExperience: string) => {
    if (
      selectedExperience &&
      !experiences.some((s) => s.name === selectedExperience)
    ) {
      const experienceToAdd = EXPERIENCES.find(
        (experience) => experience.name === selectedExperience
      );
      if (experienceToAdd) {
        handleChange('experiences', [...experiences, experienceToAdd]);
        addExperience(experienceToAdd);
        setQuery('');
      }
    }
  };

  return (
    <AutoCompleteContainer>
      <StyledAutoComplete
        borderColor={useThemeColor({}, 'placeholder')}
        data={filteredExperiences}
        value={query}
        onChangeText={handleSearch}
        placeholder="Search a experience"
        flatListProps={{
          keyExtractor: (_, i) => i.toString(),
          renderItem: ({ item }) => (
            // @ts-ignore
            <SuggestionItem
              key={item.id}
              onPress={() => handleAddExperience(item.name)}
            >
              {/* @ts-ignore */}
              <Experience experience={item} />
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

      <ExperienceDisplayer experiences={experiences} editing={true} />
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

export default ExperienceManager;
