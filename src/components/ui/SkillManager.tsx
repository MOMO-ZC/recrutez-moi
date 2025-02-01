import { TextInput, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';
import SkillDisplayer from './SkillDisplayer';
import { useEffect, useState } from 'react';
import { useSkill } from '@/src/hooks/useSkill';
import { getSkills } from '@/src/api/skills';
import { ManagerProps, Skill as SkillType } from '@/src/types';
import { useThemeColor } from '@/src/hooks/useThemeColor';
import AutoComplete from 'react-native-autocomplete-input';
import Skill from './Skill';

const SkillManager = (props: ManagerProps) => {
  const [SKILLS, setSKILLS] = useState<SkillType[]>([]);

  const { handleChange } = props;
  const [query, setQuery] = useState('');
  const [filteredSkills, setFilteredSkills] = useState<SkillType[]>(SKILLS);
  const { addSkill, skills } = useSkill();

  useEffect(() => {
    const loadSkills = async () => {
      const skillsData = await getSkills();
      setSKILLS(skillsData);
    };

    loadSkills();
  }, []);

  useEffect(() => {
    if (SKILLS.length > 0) {
      setFilteredSkills(SKILLS);
    }
  }, [SKILLS]);

  const handleSearch = (text: string) => {
    setQuery(text);
    if (text.trim() === '') {
      setFilteredSkills(SKILLS ?? []);
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
    <AutoCompleteContainer>
      <StyledAutoComplete
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

export default SkillManager;
