import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useThemeColor } from '../../hooks/useThemeColor';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import LikeSlider from '../../components/Slider/LikeSlider';
import { Skill } from '../../types';
import { View, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { jobOffers } from '../../mock/jobOffers';

const JobScreen = () => {
  return (
    <Container>
      <GestureHandlerRootView>
        <LikeSlider jobOffers={jobOffers} />
      </GestureHandlerRootView>
    </Container>
  );
};

export default JobScreen;

const Container = styled(View)`
  flex: 1;
`;
