import { Language as LanguageType } from '@/src/types';
import { View } from 'react-native';
import styled from 'styled-components';
import Language from './Language';
import React from 'react';
interface LanguageDisplayerProps {
  languages: LanguageType[];
  editing?: boolean;
}

const LanguageDisplayer = (props: LanguageDisplayerProps) => {
  const { languages, editing } = props;

  return (
    <>
      <LanguageContainer>
        {languages.map((language, index) => {
          return <Language editing={editing} language={language} key={index} />;
        })}
      </LanguageContainer>
    </>
  );
};

export default LanguageDisplayer;

const LanguageContainer = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
`;
