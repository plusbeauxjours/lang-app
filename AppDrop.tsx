import React, { useRef } from "react";
import { Animated, Dimensions, PanResponder, View } from "react-native";

import styled from "styled-components/native";
import Ionicons from "react-native-vector-icons/Ionicons";

const BLACK_COLOR = "#1e272e";
const GREY = "#485460";
const GREEN = "#2ecc71";
const RED = "#e74c3c";

const Container = styled.View`
  flex: 1;
  background-color: #34495e;
`;

const Edge = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Word = styled.Text<{ color: string }>`
  font-size: 38px;
  font-weight: 500;
  color: ${(props) => props.color};
`;

const WordContainer = styled(Animated.createAnimatedComponent(View))`
  width: 100px;
  height: 100px;
  justify-content: center;
  align-items: center;
  background-color: ${GREY};
  border-radius: 50px;
`;

const Center = styled.View`
  flex: 3;
  justify-content: center;
  align-items: center;
`;

const IconCard = styled(Animated.createAnimatedComponent(View))`
  background-color: white;
  padding: 10px 20px;
  border-radius: 10px;
`;

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function AppDrop() {
  // Values
  const scale = useRef(new Animated.Value(1)).current;
  const position = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  // Animations
  const onPressIn = Animated.spring(scale, {
    toValue: 0.9,
    useNativeDriver: true,
  });
  const onPressOut = Animated.spring(scale, {
    toValue: 1,
    useNativeDriver: true,
  });
  const goHome = Animated.spring(position, {
    toValue: 0,
    useNativeDriver: true,
  });

  // Pan Responders
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, { dx, dy }) => {
        position.setValue({ x: dx, y: dy });
      },
      onPanResponderGrant: () => {
        onPressIn.start();
      },
      onPanResponderRelease: () => {
        Animated.parallel([onPressOut, goHome]).start();
      },
    })
  ).current;

  // State

  return (
    <Container>
      <WordContainer>
        <Word color={GREEN}>알아</Word>
      </WordContainer>
      <Center>
        <IconCard
          {...panResponder.panHandlers}
          style={{
            transform: [...position.getTranslateTransform(), { scale }],
          }}
        >
          <Ionicons name="beer" color={GREY} size={76} />
        </IconCard>
      </Center>
      <WordContainer>
        <Word color={RED}>몰라</Word>
      </WordContainer>
    </Container>
  );
}
