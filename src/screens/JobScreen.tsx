import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useThemeColor } from '../hooks/useThemeColor';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import LikeSlider from '../components/Slider/LikeSlider';
import { Skill } from '../types';
import { View, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { jobOffers } from '../mock/jobOffers';

const JobScreen = () => {
  const favColor = useThemeColor({}, 'main');
  const dislikeColor = useThemeColor({}, 'danger');
  const likeColor = useThemeColor({}, 'success');

  const navigation = useNavigation();

  useEffect(() => {
    // Prevent hardware back button press
    const handleBackPress = () => {
      // Block back navigation
      return true;
    };

    // Listen to the back navigation event
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      e.preventDefault(); // Prevent swipe back gesture
    });

    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      // Cleanup event listeners
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
      unsubscribe();
    };
  }, [navigation]);

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
  left: 0;
`;
