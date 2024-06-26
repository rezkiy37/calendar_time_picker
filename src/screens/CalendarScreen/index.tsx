import Calendar from '@src/components/Calendar';
import TimePicker from '@src/components/TimePicker';
import React from 'react';
import {Text, View} from 'react-native';

function CalendarScreen() {
  return (
    <View>
      <Text>Calendar screen</Text>

      <Calendar />

      <TimePicker />
    </View>
  );
}

export default CalendarScreen;
