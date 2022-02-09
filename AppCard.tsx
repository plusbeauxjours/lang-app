import React, { useRef, useState } from "react";
import { Animated, Dimensions, PanResponder, View } from "react-native";

import styled from "styled-components/native";
import Ionicons from "react-native-vector-icons/Ionicons";

import icons from "./icons";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #00a8ff;
`;

const Card = styled(Animated.createAnimatedComponent(View))`
  background-color: white;
  width: 300px;
  height: 300px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
  position: absolute;
`;

const Btn = styled.TouchableOpacity`
  margin: 0px 10px;
`;

const BtnContainer = styled.View`
  flex-direction: row;
  flex: 1;
`;

const CardContainer = styled.View`
  flex: 3;
  justify-content: center;
  align-items: center;
`;

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function AppCard() {
  // Values
  const scale = useRef(new Animated.Value(1)).current;
  const position = useRef(new Animated.Value(0)).current;
  const rotation = position.interpolate({
    inputRange: [-250, 250],
    outputRange: ["-15deg", "15deg"],
  });
  const secondScale = position.interpolate({
    inputRange: [-300, 0, 300],
    outputRange: [1, 0.7, 1],
    extrapolate: "clamp",
  });

  // Animations
  const onPressIn = Animated.spring(scale, {
    toValue: 0.95,
    useNativeDriver: true,
  });
  const onPressOut = Animated.spring(scale, {
    toValue: 1,
    useNativeDriver: true,
  });
  const goCenter = Animated.spring(position, {
    toValue: 0,
    useNativeDriver: true,
  });
  const goLeft = Animated.spring(position, {
    toValue: -200,
    tension: 5,
    useNativeDriver: true,
    restDisplacementThreshold: 100,
    restSpeedThreshold: 100,
  });
  const goRight = Animated.spring(position, {
    toValue: 200,
    tension: 5,
    useNativeDriver: true,
    restDisplacementThreshold: 100,
    restSpeedThreshold: 100,
  });

  // Pan Responders
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        onPressIn.start();
      },
      onPanResponderMove: (_, { dx }) => {
        position.setValue(dx); // 카드의 위치 x를 계속해서 position변수에 set해준다.
      },
      onPanResponderRelease: (_, { dx }) => {
        if (dx < -SCREEN_WIDTH + 100) {
          // 카드의 위치 x가 limit를 벗어날 경우 실행되어 다음 카드를 보여주고 touch finished가 된다
          // goLeft라는 Animated.spring()을 .start로 실행시키고, .start의 option으로 onDissmiss를 준다.
          goLeft.start(onDismiss);
        } else if (dx > SCREEN_WIDTH - 100) {
          // 카드의 위치 x가 limit를 벗어날 경우 실행되어 다음 카드를 보여주고 touch finished가 된다
          // goRight Animated.spring()을 .start로 실행시키고, .start의 option으로 onDissmiss를 준다.
          goRight.start(onDismiss);
        } else {
          // 카드의 스케일과 위치를 원상태로 돌아오게 한다.
          Animated.parallel([goCenter, onPressOut]).start();
        }
      },
    })
  ).current;

  // State
  const [index, setIndex] = useState(0);
  const onDismiss = () => {
    scale.setValue(1);
    setIndex((prev) => prev + 1);
    position.setValue(0);
  };

  const closePress = () => {
    // goLeft라는 Animated.spring()을 .start로 실행시키고, .start의 option으로 onDissmiss를 준다.
    goLeft.start(onDismiss);
  };
  const checkPress = () => {
    // goRight Animated.spring()을 .start로 실행시키고, .start의 option으로 onDissmiss를 준다.
    goRight.start(onDismiss);
  };

  return (
    <Container>
      <CardContainer>
        <Card
          style={{
            transform: [
              {
                scale: secondScale, // 뒷장에 있는 카드의 scale
              },
            ],
          }}
        >
          <Ionicons name={icons[index + 1]} color="#192a56" size={98} />
        </Card>
        <Card
          {...panResponder.panHandlers}
          style={{
            transform: [
              { scale }, // 계속해서 바뀌는 카드 scale을 style에 적용시킨다.
              { translateX: position }, // 계속해서 바뀌는 카드의 위치 x를 style에 적용시킨다.
              { rotateZ: rotation },
            ],
          }}
        >
          <Ionicons name={icons[index]} color="#192a56" size={98} />
        </Card>
      </CardContainer>
      <BtnContainer>
        <Btn onPress={closePress}>
          <Ionicons name="close-circle" color="white" size={58} />
        </Btn>
        <Btn onPress={checkPress}>
          <Ionicons name="checkmark-circle" color="white" size={58} />
        </Btn>
      </BtnContainer>
    </Container>
  );
}
