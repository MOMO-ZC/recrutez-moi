import { useThemeColor } from '@/src/hooks/useThemeColor';
import React from 'react';
import { Text, View } from 'react-native';
import styled, { useTheme } from 'styled-components';

const Card = () => {
  const color = useThemeColor({}, 'main');

  return (
    <CardContainer color={color}>
      <PictureContainer></PictureContainer>
      <MetaDataContainer></MetaDataContainer>
      <SkillsContainer></SkillsContainer>
    </CardContainer>
  );
};

const CardContainer = styled(View)<{ color: string }>`
  background-color: ${(props) => props.color};
  border-radius: 32px;
  padding: 16px;
  margin-bottom: 16px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  elevation: 5;
  width: 240px;
  height: 350px;
`;
const PictureContainer = styled(View)`
  background-color: #fff;
  width: 100%;
  height: 54%;
  border-radius: 24px;
  overflow: hidden;
`;
const MetaDataContainer = styled(View)`
  margin-top: 8px;
  width: 40%;
  height: 20%;
  background-color: red;
`;
const SkillsContainer = styled(View)`
  width: 100%;
  height: 20%;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 8px;
  background-color: blue;
`;

export default Card;
