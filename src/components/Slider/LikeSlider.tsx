import React, { ReactElement, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { snapPoint, useVector } from 'react-native-redash';

import Wave, { HEIGHT, MARGIN_WIDTH, Side, WIDTH } from './Wave';
import { useThemeColor } from '@/src/hooks/useThemeColor';
import Button from './Button';
import { JobOffer, Skill } from '@/src/types';
import Offer from './Offer';
import styled from 'styled-components';
import { likeOffer } from '@/src/api/jobOffers';
import { useAuth } from '@/src/hooks/useAuth';

const PREV = WIDTH;
const NEXT = 0;
const LEFT_SNAP_POINTS = [MARGIN_WIDTH, PREV];
const RIGHT_SNAP_POINTS = [NEXT, WIDTH - MARGIN_WIDTH];

interface SliderProps {
  jobOffers: JobOffer[];
}

const LikeSlider = (props: SliderProps) => {
  const { jobOffers } = props;
  const background = useThemeColor({}, 'background');
  const dislikeColor = useThemeColor({}, 'danger');
  const likeColor = useThemeColor({}, 'success');
  const [currentIndex, setCurrentIndex] = useState(0); // Tracks current proposition
  const left = useVector(0, HEIGHT / (3 / 2));
  const right = useVector(0, HEIGHT / (3 / 2));
  const activeSide = useSharedValue(Side.NONE);
  const isTransitioningLeft = useSharedValue(false);
  const isTransitioningRight = useSharedValue(false);
  const { userId } = useAuth();

  const updateData = async (direction: 'like' | 'dislike') => {
    if (direction === 'like') {
      try {
        if (userId) {
          const response = await likeOffer(userId, jobOffers[currentIndex].id);
          console.log(response);
        }
      } catch (error) {
        console.log('Error:', error);
      }
    } else {
      console.log('Disliked:', jobOffers[currentIndex]);
    }
    setCurrentIndex((prevIndex) => (prevIndex + 1) % jobOffers.length);
  };

  const leftStyle = useAnimatedStyle(() => ({
    zIndex: isTransitioningLeft.value ? 3 : 1,
  }));

  const rightStyle = useAnimatedStyle(() => ({
    zIndex: isTransitioningRight.value ? 2 : 1,
  }));

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: ({ x }) => {
      if (x <= MARGIN_WIDTH) {
        activeSide.value = Side.LEFT; // Swipe Left
      } else if (x >= WIDTH - MARGIN_WIDTH) {
        activeSide.value = Side.RIGHT; // Swipe Right
      } else {
        activeSide.value = Side.NONE;
      }
    },
    onActive: ({ x, y }) => {
      if (activeSide.value === Side.LEFT) {
        leftStyle.zIndex = 2;
        rightStyle.zIndex = 1;
        left.x.value = Math.max(x, MARGIN_WIDTH);
        left.y.value = y;
      } else if (activeSide.value === Side.RIGHT) {
        rightStyle.zIndex = 2;
        right.x.value = Math.max(WIDTH - x, MARGIN_WIDTH);
        right.y.value = y;
      }
    },
    onEnd: ({ velocityX, velocityY, x }) => {
      if (activeSide.value === Side.LEFT) {
        const dest = snapPoint(x, velocityX, LEFT_SNAP_POINTS);
        isTransitioningLeft.value = dest === PREV;
        left.x.value = withDelay(
          800,
          withSpring(
            dest,
            {
              velocity: velocityX,
              overshootClamping: isTransitioningLeft.value ? true : false,
              restSpeedThreshold: isTransitioningLeft.value ? 100 : 0.01,
              restDisplacementThreshold: isTransitioningLeft.value ? 100 : 0.01,
            },
            () => {
              if (isTransitioningLeft.value) {
                runOnJS(updateData)('dislike');
              }
              isTransitioningLeft.value = false;
              activeSide.value = Side.NONE;
            }
          )
        );
        left.y.value = withSpring(HEIGHT / (3 / 2), { velocity: velocityY });
      } else if (activeSide.value === Side.RIGHT) {
        const dest = snapPoint(x, velocityX, RIGHT_SNAP_POINTS);
        isTransitioningRight.value = dest === NEXT;
        right.x.value = withDelay(
          800,
          withSpring(
            WIDTH - dest,
            {
              velocity: velocityX,
              overshootClamping: isTransitioningRight.value ? true : false,
              restSpeedThreshold: isTransitioningRight.value ? 100 : 0.01,
              restDisplacementThreshold: isTransitioningRight.value
                ? 100
                : 0.01,
            },
            () => {
              if (isTransitioningRight.value) {
                runOnJS(updateData)('like');
              }
              isTransitioningRight.value = false;
              activeSide.value = Side.NONE;
            }
          )
        );
        right.y.value = withSpring(HEIGHT / (3 / 2), { velocity: velocityY });
      }
    },
  });

  useEffect(() => {
    left.x.value = withSpring(MARGIN_WIDTH);
    right.x.value = withSpring(MARGIN_WIDTH);
  }, [left, right]);

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={StyleSheet.absoluteFill}>
        {/* Dislike Slide */}
        <Animated.View
          style={[StyleSheet.absoluteFill, leftStyle]}
          pointerEvents={isTransitioningLeft.value ? 'auto' : 'none'}
        >
          <Wave
            position={left}
            side={Side.LEFT}
            isTransitioning={isTransitioningLeft}
          >
            <View style={[styles.slide, { backgroundColor: dislikeColor }]}>
              <Text style={styles.text}>Dislike</Text>
            </View>
          </Wave>
          <Button position={left} side={Side.LEFT} activeSide={activeSide} />
        </Animated.View>

        {/* Current Proposition Slide */}
        <View
          style={[
            { backgroundColor: background, zIndex: 0 },
            styles.proposition,
          ]}
          pointerEvents="auto"
        >
          <Offer jobOffer={jobOffers[currentIndex]} />
        </View>

        {/* Like Slide */}
        <Animated.View
          style={[StyleSheet.absoluteFill, rightStyle]}
          pointerEvents={isTransitioningRight.value ? 'auto' : 'none'}
        >
          <Wave
            position={right}
            side={Side.RIGHT}
            isTransitioning={isTransitioningRight}
          >
            <View style={[styles.slide, { backgroundColor: likeColor }]}>
              <Text style={styles.text}>Like</Text>
            </View>
          </Wave>
          <Button position={right} side={Side.RIGHT} activeSide={activeSide} />
        </Animated.View>
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  proposition: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
  },
  text: {
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

const ScrollableContainer = styled(ScrollView).attrs(() => ({
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: 20, // Prevent cutoff at the bottom
  },
}))`
  flex: 1;
`;

export default LikeSlider;
