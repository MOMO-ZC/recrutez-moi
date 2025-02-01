import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { useThemeColor } from '../../hooks/useThemeColor';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import LikeSlider from '../../components/Slider/LikeSlider';
import { Skill } from '../../types';
import { View, BackHandler } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { jobOffers } from '../../mock/jobOffers';
import { getJobOffers } from '@/src/api/jobOffers';

const JobScreen = () => {
  const [offers, setOffers] = React.useState(jobOffers);

  useFocusEffect(
    useCallback(() => {
      const loadOffers = async () => {
        const offersData = await getJobOffers();
        setOffers(offersData);
      };
      loadOffers();
    }, [])
  );

  return (
    <Container>
      <GestureHandlerRootView>
        {offers && <LikeSlider jobOffers={offers} />}
      </GestureHandlerRootView>
    </Container>
  );
};

export default JobScreen;

const Container = styled(View)`
  flex: 1;
`;
