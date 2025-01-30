import { Skill as SkillType } from '@/src/types';
import { View } from 'react-native';
import styled from 'styled-components';
import Skill from './Skill';
import React from 'react';
interface SkillDisplayerProps {
  skills: SkillType[];
  editing?: boolean;
}

const SkillDisplayer = (props: SkillDisplayerProps) => {
  const { skills, editing } = props;

  return (
    <>
      <SkillContainer>
        {skills.map((skill, index) => {
          return <Skill editing={editing} skill={skill} key={index} />;
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
