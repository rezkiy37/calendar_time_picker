import React from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

type Period = 'am' | 'pm';

type TimeSliderProps = {
  label: string;
  period: Period;
};

const itemWidth = 100;
const itemHeight = 60;

const timeSlots: string[] = [];

for (let hour = 0; hour < 12; hour++) {
  for (let minute = 0; minute < 60; minute += 15) {
    const formattedHour = hour.toString().padStart(2, '0');
    const formattedMinute = minute.toString().padStart(2, '0');

    timeSlots.push(`${formattedHour}:${formattedMinute}`);
  }
}
const width = Dimensions.get('window').width;

function TimeSlider({label, period}: TimeSliderProps) {
  const renderItem = ({item}: {item: string}) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item}</Text>
      <Text style={styles.itemPeriod}>{period}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <Carousel
        loop={false}
        width={width}
        height={itemHeight}
        autoPlay={false}
        data={timeSlots}
        defaultIndex={timeSlots.length / 2}
        scrollAnimationDuration={300}
        onSnapToItem={index => console.log('current index:', index)}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 120,
    paddingVertical: 16,
  },
  label: {
    marginBottom: 16,
    paddingHorizontal: 16,
    color: 'white',
    fontSize: 16,
  },
  itemContainer: {
    width: itemWidth,
    height: itemHeight,
    padding: 6,
    alignItems: 'center',
  },
  itemText: {
    color: 'green',
    fontSize: 24,
    fontWeight: 'bold',
  },
  itemPeriod: {
    color: 'green',
    fontSize: 16,
  },
});

export default TimeSlider;
