import React, {useCallback, useEffect, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  clamp,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import TimeSlot from './TimeSlot';
import {
  TIME_SLOT_BREAKPOINTS,
  TIME_SLOTS,
  type TimeSlot as TimeSlotType,
} from './const';

type TimeSliderProps = {
  label: string;
  onTimeChange: (time: TimeSlotType) => void;
};

const getClosestBreakpoint = (x: number): number => {
  'worklet';

  return TIME_SLOT_BREAKPOINTS.reduce((acc, currentValue) =>
    Math.abs(currentValue - x) < Math.abs(acc - x) ? currentValue : acc,
  );
};

function TimeSlider({label, onTimeChange}: TimeSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const translationX = useSharedValue(TIME_SLOT_BREAKPOINTS[currentIndex]);
  const startTranslateX = useSharedValue(0);
  const scrollViewAnimatedStyles = useAnimatedStyle(() => ({
    transform: [{translateX: translationX.value}],
  }));

  const pan = Gesture.Pan()
    .minDistance(1)
    .maxPointers(1)
    .onBegin(event => {
      cancelAnimation(translationX);
      startTranslateX.value = event.x;
    })
    .onUpdate(event => {
      translationX.value = clamp(
        translationX.value + event.x - startTranslateX.value,
        TIME_SLOT_BREAKPOINTS[TIME_SLOT_BREAKPOINTS.length - 1],
        TIME_SLOT_BREAKPOINTS[0],
      );
    })
    .onEnd(event => {
      translationX.value = withDecay(
        {
          velocity: event.velocityX,
          clamp: [
            TIME_SLOT_BREAKPOINTS[TIME_SLOT_BREAKPOINTS.length - 1],
            TIME_SLOT_BREAKPOINTS[0],
          ],
        },
        finished => {
          if (!finished) {
            return;
          }

          const closestBreakpoint = getClosestBreakpoint(translationX.value);
          translationX.value = withTiming(closestBreakpoint, {duration: 300});
          const newIndex = TIME_SLOT_BREAKPOINTS.indexOf(closestBreakpoint);

          runOnJS(setCurrentIndex)(newIndex);
        },
      );
    });

  const selectTimeSlot = useCallback(
    (index: number) => {
      setCurrentIndex(index);

      translationX.value = withSpring(TIME_SLOT_BREAKPOINTS[index], {
        duration: 1000,
      });
    },
    [translationX],
  );

  useEffect(() => {
    onTimeChange(TIME_SLOTS[currentIndex]);
  }, [currentIndex, onTimeChange]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <GestureDetector gesture={pan}>
        <Animated.View
          style={[styles.scrollViewContainer, scrollViewAnimatedStyles]}>
          {TIME_SLOTS.map(({time, period}, index: number) => (
            <TimeSlot
              key={index}
              selectedIndex={currentIndex}
              index={index}
              timeSlot={time}
              period={period}
              onPress={selectTimeSlot}
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
