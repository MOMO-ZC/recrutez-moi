import React, { forwardRef, useState, useImperativeHandle } from "react";
import { View } from "react-native";
import Swiper, { SwiperProps } from "react-native-deck-swiper";
import styled from "styled-components";
import Card from "./ui/Card";

interface SwipperProps extends Partial<SwiperProps<any>> {
  cards: Array<any>; // Type for your card data
}

const Swipper = forwardRef<Swiper<any>, SwipperProps>(({ cards, ...swiperProps }, ref) => {
  const [index, setIndex] = useState(0);

  const onSwiped = () => {
    setIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      console.log("Swiped", newIndex);
      return newIndex;
    });
  };

  const onSwipedAll = () => {
    console.log("All cards swiped");
  };

  return (
    <SwipeContainer>
      <Swiper
        ref={ref as React.LegacyRef<Swiper<any>>} // Ensure the ref is compatible
        backgroundColor="transparent"
        cards={cards}
        cardIndex={index}
        renderCard={(card) => <Card/>}
        infinite={true}
        stackSize={3}
        stackSeparation={14}
        onSwiped={onSwiped}
        onSwipedAll={onSwipedAll}
        {...swiperProps} // Pass additional props
      />
    </SwipeContainer>
  );
});

export default Swipper;

const SwipeContainer = styled(View)`
  flex: 1;
`;

