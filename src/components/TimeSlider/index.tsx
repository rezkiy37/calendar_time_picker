import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
  type ForwardedRef,
} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  cancelAnimation,
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

type TimeSliderRef = {
  reset: () => void;
};

type TimeSliderProps = {
  label: string;
  defaultValue: TimeSlotType;
  onTimeChange: (time: TimeSlotType) => void;
};

const getClosestBreakpoint = (x: number): number => {
  'worklet';

  return TIME_SLOT_BREAKPOINTS.reduce((acc, currentValue) =>
    Math.abs(currentValue - x) < Math.abs(acc - x) ? currentValue : acc,
  );
};

function TimeSlider(
  {label, defaultValue, onTimeChange}: TimeSliderProps,
  ref: ForwardedRef<TimeSliderRef>,
) {
  const defaultIndex = useMemo(
    () =>
      TIME_SLOTS.findIndex(
        timeSlot =>
          timeSlot.time === defaultValue.time &&
          timeSlot.period === defaultValue.period,
      ) || 0,
    [defaultValue],
  );

  const [currentIndex, setCurrentIndex] = useState(defaultIndex);

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

  useImperativeHandle(ref, () => ({
    reset: () => {
      cancelAnimation(translationX);
      setCurrentIndex(defaultIndex);
      translationX.value = TIME_SLOT_BREAKPOINTS[defaultIndex];
    },
  }));

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

export type {TimeSliderRef};

export default forwardRef(TimeSlider);
