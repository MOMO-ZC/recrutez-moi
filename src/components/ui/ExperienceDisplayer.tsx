import { Experience as ExperienceType } from '@/src/types';
import { View } from 'react-native';
import styled from 'styled-components';
import Experience from './Experience';
import React from 'react';
interface ExperienceDisplayerProps {
  experiences: ExperienceType[];
  editing?: boolean;
}

const ExperienceDisplayer = (props: ExperienceDisplayerProps) => {
  const { experiences, editing } = props;

  return (
    <>
      <ExperienceContainer>
        {experiences.map((experience, index) => {
          return (
            <Experience editing={editing} experience={experience} key={index} />
          );
        })}
      </ExperienceContainer>
    </>
  );
};

export default ExperienceDisplayer;

const ExperienceContainer = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
`;
