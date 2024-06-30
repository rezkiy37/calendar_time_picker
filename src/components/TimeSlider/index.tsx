import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {
  Directions,
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import TimeSlot from './TimeSlot';
import {TIME_SLOT_BREAKPOINTS, TIME_SLOTS} from './const';

type Period = 'am' | 'pm';

type TimeSliderProps = {
  label: string;
  period: Period;
};

function TimeSlider({label, period}: TimeSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const translateX = useSharedValue(TIME_SLOT_BREAKPOINTS[currentIndex]);
  const startTranslateX = useSharedValue(0);
  const scrollViewAnimatedStyles = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
  }));

  const fling = Gesture.Fling()
    // eslint-disable-next-line no-bitwise
    .direction(Directions.LEFT | Directions.RIGHT)
    .onBegin(event => {
      console.group('onBegin');
      console.log('event', event);
      console.groupEnd();

      startTranslateX.value = event.x;
    })
    .onStart(event => {
      console.group('onStart');
      console.log('event', event);
      console.groupEnd();

      translateX.value = withTiming(
        translateX.value + event.x - startTranslateX.value,
        {duration: 100},
      );
    })
    .onEnd(event => {
      console.group('onEnd');
      console.log('event', event);

      let nextIndex;

      if (event.x > startTranslateX.value) {
        nextIndex = currentIndex - 1;
      } else {
        nextIndex = currentIndex + 1;
      }

      if (nextIndex < 0 || nextIndex >= TIME_SLOTS.length) {
        nextIndex = currentIndex;
      }

      console.log('nextIndex', nextIndex);
      console.groupEnd();

      setCurrentIndex(nextIndex);
      translateX.value = withTiming(TIME_SLOT_BREAKPOINTS[nextIndex], {
        duration: 100,
      });
    })
    .runOnJS(true);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <GestureDetector gesture={fling}>
        <Animated.View
          style={[styles.scrollViewContainer, scrollViewAnimatedStyles]}>
          {TIME_SLOTS.map((timeSlot: string, index: number) => (
            <TimeSlot
              key={timeSlot}
              selectedIndex={currentIndex}
              index={index}
              timeSlot={timeSlot}
              period={period}
            />
          ))}
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 120,
    paddingVertical: 16,
  },
  scrollViewContainer: {
    width: '100%',
    flexDirection: 'row',
  },
  label: {
    marginBottom: 16,
    paddingHorizontal: 16,
    color: 'white',
    fontSize: 16,
  },
});

export default TimeSlider;
