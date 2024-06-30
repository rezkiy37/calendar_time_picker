import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import {ITEM_HEIGHT, ITEM_WIDTH} from './const';

type TimeSlotProps = {
  selectedIndex: number;
  index: number;
  timeSlot: string;
  period: string;
};

function TimeSlot({selectedIndex, index, timeSlot, period}: TimeSlotProps) {
  const textColor = useDerivedValue(
    () => (selectedIndex === index ? 'green' : 'lightgray'),
    [selectedIndex],
  );

  const itemColorAnimatedStyles = useAnimatedStyle(() => ({
    color: withTiming(textColor.value, {duration: 500}),
  }));

  return (
    <View style={styles.itemContainer}>
      <Animated.Text style={[styles.itemText, itemColorAnimatedStyles]}>
        {timeSlot}
      </Animated.Text>

      <Animated.Text style={[styles.itemPeriod, itemColorAnimatedStyles]}>
        {period}
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    padding: 6,
    alignItems: 'center',
  },
  itemText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  itemPeriod: {
    fontSize: 16,
  },
});

export default memo(TimeSlot);
