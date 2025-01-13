import type { Formation as FormationType } from '@/src/types';
import { View } from 'react-native';
import styled from 'styled-components';
import { ThemedText } from '../ThemedText';
import { useThemeColor } from '@/src/hooks/useThemeColor';

interface FormationDisplayerProps {
  formations: FormationType[];
}

const FormationDisplayer = (props: FormationDisplayerProps) => {
  const { formations } = props;
  const itemColor = useThemeColor({}, 'ui-items');

  return (
    <FormationContainer>
      {formations.map((formation, index) => {
        return (
          <FormationItem color={itemColor} key={index}>
            <ThemedText type="defaultSemiBold">{formation.degree}</ThemedText>
            <ThemedText type="default">{formation.domain}</ThemedText>
            <ThemedText type="default">
              {formation.school} | {formation.location}
            </ThemedText>
            <ThemedText type="default">
              {formation.startDate} - {formation.endDate}
            </ThemedText>
          </FormationItem>
        );
      })}
    </FormationContainer>
  );
};

export default FormationDisplayer;

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
`;
