import React from 'react';
import {Text, View, FlatList, StyleSheet} from 'react-native';

type TimeSliderProps = {
  label: string;
};

const timeSlots: string[] = [];

for (let hour = 0; hour < 12; hour++) {
  for (let minute = 0; minute < 60; minute += 15) {
    const formattedHour = hour.toString().padStart(2, '0');
    const formattedMinute = minute.toString().padStart(2, '0');

    timeSlots.push(`${formattedHour}:${formattedMinute}`);
  }
}

const keyExtractor = (timeSlot: string) => timeSlot;

function TimeSlider({label}: TimeSliderProps) {
  const renderItem = ({item}: {item: string}) => <Text>{item}</Text>;
  const renderSeparator = () => <View style={styles.separator} />;

  return (
    <View style={styles.container}>
      <Text>{label}</Text>

      <FlatList
        horizontal
        data={timeSlots}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    width: 16,
  },
});

export default TimeSlider;
