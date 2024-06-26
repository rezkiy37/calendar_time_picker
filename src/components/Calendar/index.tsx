import React from 'react';
import {StyleSheet, View} from 'react-native';
import {CalendarList} from 'react-native-calendars';

type CalendarProps = {
  onDayPress: (date: Date) => void;
};

function Calendar({onDayPress}: CalendarProps) {
  return (
    <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    height: '60%',
  },
});

export default Calendar;
