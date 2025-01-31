import { Text, View } from 'react-native';
import styled from 'styled-components';
import { ThemedText } from '../ThemedText';
import { Feather } from '@expo/vector-icons';
import { Language as LanguageType } from '@/src/types';
import { useThemeColor } from '@/src/hooks/useThemeColor';
import RoundedButton from './RoundedButton';
import { useLanguage } from '@/src/hooks/useLanguage';

interface LanguageProps {
  language: LanguageType;
  editing?: boolean;
}

const Language = (props: LanguageProps) => {
  const { removeLanguage } = useLanguage();
  const iconColor = useThemeColor({}, 'text');
  const { language, editing } = props;
  const { level, name } = language;
  const beginner = useThemeColor({}, 'beginner');
  const intermediate = useThemeColor({}, 'intermediate');
  const advanced = useThemeColor({}, 'advanced');
  const native = useThemeColor({}, 'native');
  const colors = {
    beginner,
    intermediate,
    advanced,
    native,
  };
  return (
    <LanguageContainer color={colors[level]}>
      <LanguageName>{name}</LanguageName>
      {editing && (
        <IconWrapper>
          <RoundedButton
            size={16}
            color={'transparent'}
            icon={<Feather name="x" size={16} color={iconColor} />}
            onPress={() => removeLanguage(name)}
          />
        </IconWrapper>
      )}
    </LanguageContainer>
  );
};

export default Language;

const LanguageContainer = styled(View)<{ color: string }>`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border-radius: 12px;
  height: 32px;
  background-color: ${(props) => props.color};
  padding: 4px;
  margin: 4px;
`;

const IconWrapper = styled(View)`
  justify-content: center;
  align-items: center;
  padding: 2px;
`;

const LanguageName = styled(ThemedText)`
  padding-right: 2px;
`;
