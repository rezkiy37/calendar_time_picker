import React from 'react';
import {View} from 'react-native';
import {CalendarList} from 'react-native-calendars';

type CalendarProps = {
  onDayPress: (date: Date) => void;
};

function Calendar({onDayPress}: CalendarProps) {
  return (
    <View>
      <CalendarList
        scrollEnabled
        showScrollIndicator={false}
        pastScrollRange={0}
        futureScrollRange={24}
        onDayPress={day => {
          onDayPress(new Date(day.timestamp));
        }}
      />
    </View>
  );
}

export default Calendar;
