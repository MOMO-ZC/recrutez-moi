import styled from 'styled-components';
import { useThemeColor } from '../hooks/useThemeColor';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import LikeSlider from '../components/Slider/LikeSlider';
import ScreenContainer from './common/ScreenContainer';
import { Skill } from '../types';

const JobScreen = () => {
  const favColor = useThemeColor({}, 'main');
  const dislikeColor = useThemeColor({}, 'danger');
  const likeColor = useThemeColor({}, 'success');
  const propositions = ['test1', 'test2', 'test3'];
  const skills: Skill[] = [
    {
      name: 'python',
      category: 'backend',
    },
    {
      name: 'react',
      category: 'frontend',
    },
    {
      name: 'teamwork',
      category: 'softskills',
    },
    {
      name: 'photoshop',
      category: 'software',
    },
  ];

  return (
    <ScreenContainer>
      <GestureHandlerRootView>
        <LikeSlider propositions={propositions} skills={skills} />
      </GestureHandlerRootView>
    </ScreenContainer>
  );
};

export default JobScreen;
