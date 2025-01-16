import { Skill as SkillType } from '@/src/types';
import { View } from 'react-native';
import styled from 'styled-components';
import Skill from '../ui/Skill';

interface SkillDisplayerProps {
  skills: SkillType[];
}

const SkillDisplayer = (props: SkillDisplayerProps) => {
  const { skills } = props;

  return (
    <>
      <SkillContainer>
        {skills.map((skill, index) => {
          return <Skill skill={skill} key={index} />;
        })}
      </SkillContainer>
    </>
  );
};

export default SkillDisplayer;

const SkillContainer = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
`;
