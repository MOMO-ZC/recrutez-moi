import { Canvas, Rect, LinearGradient, vec } from "@shopify/react-native-skia";
import chroma from "chroma-js";
import { useWindowDimensions } from "react-native";
import { useDerivedValue, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { useThemeColor } from "../hooks/useThemeColor";
import React from "react";


export const GradientBackGround = () => {

    const blurColor = useThemeColor({}, 'blur');
    const mainColor = useThemeColor({}, 'main');

    const {width, height} = useWindowDimensions();

    const wave = useSharedValue(0);

    React.useEffect(() => {
        wave.value = withRepeat(
          withTiming(Math.PI * 2, { duration: 6000 }), 
          -1 // Infinite loop
        );
      }, [wave]);
    
      // Derived values for start and end positions
      const start = useDerivedValue(() => {
        const x = 200+  width / 2 + Math.sin(wave.value) * width / 4; // Wavy motion on X-axis
        const y = -200 + height / 4 + Math.cos(wave.value) * height / 8; // Smaller motion on Y-axis
        return vec(x, y);
      });
    
      const end = useDerivedValue(() => {
        const x = width / 2 + Math.sin(wave.value + Math.PI) * width / 4; // Opposite wave motion
        const y = height * 3 / 4 + Math.cos(wave.value + Math.PI) * height / 8;
        return vec(x, y);
      });

    const gradientColors = chroma.scale([mainColor, blurColor]).colors(10);

    return (
        <Canvas style={{flex: 1}}>
        <Rect x={0}
        y={0}
        width={width}
        height={height}
        >

        <LinearGradient
        start={start}
        end={end}
        colors={gradientColors}
        />
        </Rect>

        </Canvas>
    );
    }

export default GradientBackGround;

