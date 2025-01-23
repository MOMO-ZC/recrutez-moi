import type { Formation as FormationType } from '@/src/types';
import { View } from 'react-native';
import styled from 'styled-components';
import { ThemedText } from '../ThemedText';
import { useThemeColor } from '@/src/hooks/useThemeColor';
import RoundedButton from '../ui/RoundedButton';
import { Feather } from '@expo/vector-icons';
import { router, useRouter } from 'expo-router';
import { useFormation } from '@/src/hooks/useFormation';

interface FormationDisplayerProps {
  formations: FormationType[];
}

const FormationDisplayer = (props: FormationDisplayerProps) => {
  const { formations } = props;
  const itemColor = useThemeColor({}, 'ui-items');
  const iconColor = useThemeColor({}, 'text');
  const buttonColor = useThemeColor({}, 'ui-buttons');

  const router = useRouter();
  const { setFormation } = useFormation();

  const handleEdit = (formation?: FormationType) => {
    console.log(formation);
    if (formation) setFormation(formation);
    else setFormation();
    router.push('/(tabs)/profile/edit-formation');
  };
  return (
    <FormationContainer>
      {formations.map((formation, index) => {
        return (
          <FormationItem color={itemColor} key={index}>
            <InfoContainer>
              <ThemedText type="defaultSemiBold">{formation.degree}</ThemedText>
              <ThemedText type="default">{formation.domain}</ThemedText>
              <ThemedText type="default">
                {formation.school} | {formation.location}
              </ThemedText>
              <ThemedText type="default">
                {formation.startDate} - {formation.endDate}
              </ThemedText>
            </InfoContainer>
            <EditButtonContainer>
              <RoundedButton
                size={32}
                color={buttonColor}
                icon={<Feather name="edit-3" size={16} color={iconColor} />}
                onPress={() => handleEdit(formation)}
              />
            </EditButtonContainer>
          </FormationItem>
        );
      })}
      <ButtonContainer>
        <RoundedButton
          size={40}
          color={itemColor}
          icon={<Feather name="plus" size={24} color={iconColor} />}
          onPress={() => handleEdit()}
        />
      </ButtonContainer>
    </FormationContainer>
  );
};

export default FormationDisplayer;

const ButtonContainer = styled(View)`
  margin-top: 16px;
  align-items: center;
  shadow-color: #000;
  elevation: 5;
  shadow-offset: {
    width: 0;
    height: 2;
  }
  shadow-opacity: 0.25;
  shadow-radius: 4;
`;

const FormationContainer = styled(View)``;

const FormationItem = styled(View)<{ color: string }>`
  background-color: ${(props) => props.color};
  margin-top: 8px;
  padding: 8px;
  border-radius: 8px;
  shadow-color: #000;
  shadow-offset: {
    width: 0;
    height: 2;
  }
  shadow-opacity: 0.25;
  shadow-radius: 4;
  elevation: 5;
  flex-direction: row;
  align-items: center;
`;

const InfoContainer = styled(View)``;

const EditButtonContainer = styled(View)`
  position: absolute;
  right: 16;
`;
