import React, { ReactElement, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import { snapPoint, useVector } from "react-native-redash";

import Wave, { HEIGHT, MARGIN_WIDTH, Side, WIDTH } from "./Wave";
import { useThemeColor } from "@/src/hooks/useThemeColor";
import Button from "./Button";

const PREV = WIDTH;
const NEXT = 0;
const LEFT_SNAP_POINTS = [MARGIN_WIDTH, PREV];
const RIGHT_SNAP_POINTS = [NEXT, WIDTH - MARGIN_WIDTH];

interface SliderProps {
  propositions: string[]; // Array of propositions for Slide 2
}

const LikeSlider = ({ propositions }: SliderProps) => {
  const mainColor = useThemeColor({}, 'main');
  const dislikeColor = useThemeColor({}, 'danger');
  const likeColor = useThemeColor({}, 'success');
  const [currentIndex, setCurrentIndex] = useState(0); // Tracks current proposition
  const left = useVector(0, HEIGHT / (3/2));
  const right = useVector(0, HEIGHT / (3/2));
  const activeSide = useSharedValue(Side.NONE);
  const isTransitioningLeft = useSharedValue(false);
  const isTransitioningRight = useSharedValue(false);

  const updateData = (direction: "like" | "dislike") => {
    if (direction === "like") {
      console.log("Liked:", propositions[currentIndex]);
    } else {
      console.log("Disliked:", propositions[currentIndex]);
    }
    setCurrentIndex((prevIndex) => (prevIndex + 1) % propositions.length);
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
        leftStyle.zIndex = 3;
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
      const threshold = WIDTH * 0.7; // 70% of screen width
    
      if (activeSide.value === Side.LEFT) {
        const dest = x > threshold ? WIDTH : MARGIN_WIDTH;
        isTransitioningLeft.value = dest === WIDTH;
    
        left.x.value = withSpring(
          dest,
          {
            velocity: velocityX,
            overshootClamping: isTransitioningLeft.value,
            restSpeedThreshold: isTransitioningLeft.value ? 100 : 0.01,
            restDisplacementThreshold: isTransitioningLeft.value ? 100 : 0.01,
          },
          () => {
            if (isTransitioningLeft.value) {
              // Optional: Add a delay before returning
              runOnJS(updateData)("dislike");
              // setTimeout(() => {
              //   left.x.value = withSpring(MARGIN_WIDTH, {}, () => {
              //     activeSide.value = Side.NONE;
              //   });
              // }, 500); // Adjust delay as needed
            } 
            isTransitioningLeft.value = false;
            activeSide.value = Side.NONE;
          }
        );
        left.y.value = withSpring(HEIGHT / 2, { velocity: velocityY });
      } else if (activeSide.value === Side.RIGHT) {
        const dest = x < WIDTH - threshold ? 0 : WIDTH - MARGIN_WIDTH;
        isTransitioningRight.value = dest === 0;
    
        right.x.value = withSpring(
          WIDTH - dest,
          {
            velocity: velocityX,
            overshootClamping: isTransitioningRight.value,
            restSpeedThreshold: isTransitioningRight.value ? 100 : 0.01,
            restDisplacementThreshold: isTransitioningRight.value ? 100 : 0.01,
          },
          () => {
            if (isTransitioningRight.value) {
              // Optional: Add a delay before returning
              runOnJS(updateData)("like");
            //   setTimeout(() => {
            //    isTransitioningRight.value = false;
            //   }, 500); // Adjust delay as needed
            } 
            isTransitioningRight.value = false;
            activeSide.value = Side.NONE;
          }
        );
        right.y.value = withSpring(HEIGHT / 2, { velocity: velocityY });
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
        <Animated.View style={[StyleSheet.absoluteFill, leftStyle]}>
          <Wave position={left} side={Side.LEFT} isTransitioning={isTransitioningLeft}>
            <View style={[styles.slide, {backgroundColor: dislikeColor}]}>
              <Text style={styles.text}>Dislike</Text>
            </View>
          </Wave>
          <Button position={left} side={Side.LEFT} activeSide={activeSide} />
        </Animated.View>

        {/* Current Proposition Slide */}
        <View style={[StyleSheet.absoluteFill, {backgroundColor: mainColor}, styles.proposition]}>
          <Text style={styles.text}>{propositions[currentIndex]}</Text>
        </View>

        {/* Like Slide */}
        <Animated.View style={[StyleSheet.absoluteFill, rightStyle]}>
          <Wave position={right} side={Side.RIGHT} isTransitioning={isTransitioningRight}>
            <View style={[styles.slide, {backgroundColor: likeColor}]}>
              <Text style={styles.text}>Like</Text>
            </View>
          </Wave>
          <Button
              position={right}
              side={Side.RIGHT}
              activeSide={activeSide}
            />
        </Animated.View>
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  proposition: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default LikeSlider;
