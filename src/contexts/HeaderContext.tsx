import React, { createContext, useState, useRef, ReactNode } from 'react';
import { Animated } from 'react-native';

interface HeaderContextProps {
  menuVisible: boolean;
  toggleMenu: () => void;
  animationValue: Animated.Value;
}

export const HeaderContext = createContext<HeaderContextProps | undefined>(
  undefined
);

export const HeaderProvider = ({ children }: { children: ReactNode }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const animationValue = useRef(new Animated.Value(0)).current;

  const toggleMenu = () => {
    if (menuVisible) {
      Animated.timing(animationValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => setMenuVisible(false));
    } else {
      setMenuVisible(true);
      Animated.timing(animationValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <HeaderContext.Provider value={{ menuVisible, toggleMenu, animationValue }}>
      {children}
    </HeaderContext.Provider>
  );
};
