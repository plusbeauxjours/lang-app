import React, { useState, useRef } from "react";
import { Animated, Dimensions, PanResponder, Pressable } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Box = styled.View`
  background-color: tomato;
  width: 200px;
  height: 200px;
`;

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const AnimatedBox = Animated.createAnimatedComponent(Box);

export default function App() {
  // const [up, setUp] = useState(false);
  // const POSITION = useRef(new Animated.ValueXY({ x: 0, y: 300 })).current;

  const POSITION = useRef(
    new Animated.ValueXY({
      // x: -SCREEN_WIDTH / 2 + 100,
      // y: -SCREEN_HEIGHT / 2 + 100,
      x: 0,
      y: 0,
    })
  ).current;

  // const toggleUp = () => setUp((prev) => !prev);

  // const moveUp = () => {
  //   Animated.timing(POSITION, {
  //     toValue: up ? 300 : -300,
  //     useNativeDriver: false,
  //     duration: 1000,
  //   }).start(toggleUp);
  // };

  // const rotation = POSITION.y.interpolate({
  //   inputRange: [-300, 300],
  //   outputRange: ["-360deg", "360deg"],
  // });

  // const opacity = POSITION.y.interpolate({
  //   inputRange: [-300, 0, 300],
  //   outputRange: [1, 0.5, 1],
  // });

  const borderRadius = POSITION.y.interpolate({
    inputRange: [-300, 300],
    outputRange: [100, 0],
  });

  const bgColor = POSITION.y.interpolate({
    inputRange: [-300, 300],
    outputRange: ["rgb(255, 99, 71)", "rgb(71, 166, 255)"],
  });

  // const topLeft = Animated.timing(POSITION, {
  //   toValue: {
  //     x: -SCREEN_WIDTH / 2 + 100,
  //     y: -SCREEN_HEIGHT / 2 + 100,
  //   },
  //   useNativeDriver: false,
  // });

  // const bottomLeft = Animated.timing(POSITION, {
  //   toValue: {
  //     x: -SCREEN_WIDTH / 2 + 100,
  //     y: SCREEN_HEIGHT / 2 - 100,
  //   },
  //   useNativeDriver: false,
  // });

  // const bottomRight = Animated.timing(POSITION, {
  //   toValue: {
  //     x: SCREEN_WIDTH / 2 - 100,
  //     y: SCREEN_HEIGHT / 2 - 100,
  //   },
  //   useNativeDriver: false,
  // });

  // const topRight = Animated.timing(POSITION, {
  //   toValue: {
  //     x: SCREEN_WIDTH / 2 - 100,
  //     y: -SCREEN_HEIGHT / 2 + 100,
  //   },
  //   useNativeDriver: false,
  // });

  // const moveUp = () =>
  //   Animated.loop(
  //     Animated.sequence([bottomLeft, bottomRight, topRight, topLeft])
  //   ).start();

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        console.log("Touch Started");
        POSITION.setOffset({
          x: POSITION.x._value,
          y: POSITION.y._value,
        });
      },
      onPanResponderMove: (_, { dx, dy }) => {
        console.log("Finger Moving");
        POSITION.setValue({
          x: dx,
          y: dy,
        });
      },
      onPanResponderRelease: () => {
        console.log("Touch Finished");
        // Animated.spring(POSITION, {
        //   toValue: {
        //     x: 0,
        //     y: 0,
        //   },
        //   bounciness: 20,
        //   useNativeDriver: false,
        // }).start();
        POSITION.flattenOffset();
      },
    })
  ).current;

  return (
    <Container>
      {/* <Pressable onPress={moveUp}>
        <AnimatedBox
          onPress={moveUp}
          style={{
            borderRadius,
            // opacity,
            // rotation,
            backgroundColor: bgColor,
            // transform: [
            //   { rotateY: rotation },
            //   { rotateZ: rotation },
            //   { translateY: POSITION.y },
            // ],
            transform: [...POSITION.getTranslateTransform()],
          }}
        />
      </Pressable> */}
      <AnimatedBox
        {...panResponder.panHandlers}
        style={{
          borderRadius,
          backgroundColor: bgColor,
          transform: POSITION.getTranslateTransform(),
        }}
      />
    </Container>
  );
}
