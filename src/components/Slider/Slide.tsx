import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import Svg, { RadialGradient, Defs, Rect, Stop } from 'react-native-svg';

const { width, height } = Dimensions.get('screen');
const SIZE = width - 75;
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    padding: 75,
    paddingTop: 150,
    alignItems: 'center',
  },
  title: {
    fontSize: 48,
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: 'SFProDisplay-Bold',
  },
});

export interface SlideProps {
  slide: {
    color: string;
    title: string;
    description: string;
  };
}

const Slide = ({ slide: { title } }: SlideProps) => {
  return (
    <>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>
    </>
  );
};

export default Slide;
