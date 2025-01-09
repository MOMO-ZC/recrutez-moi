import type { Skill as SkillType } from '@/src/types';
import { View } from 'react-native';
import styled from 'styled-components';
import Skill from '../ui/Skill';

interface OfferProps {
  skills: SkillType[];
}

const Offer = (props: OfferProps) => {
  const { skills } = props;

  return (
    <Container>
      {skills.map((skill, index) => (
        <Skill key={index} skill={skill} />
      ))}
    </Container>
  );
};

export default Offer;

const Container = styled(View)`
  flex: 0.3;
  padding: 20px;
  flex-direction: row;
  width: 240px;
  flex-wrap: wrap;
`;
