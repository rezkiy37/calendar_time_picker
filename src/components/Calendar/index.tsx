import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {CalendarList} from 'react-native-calendars';
import {type Theme as CalendarTheme} from 'react-native-calendars/src/types';

type CalendarProps = {
  date: Date | null;
  onDayPress: (date: Date) => void;
};

const calendarHeight = 400;
const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const theme: CalendarTheme = {
  calendarBackground: 'black',
  textSectionTitleColor: 'white',
  selectedDayBackgroundColor: 'green',
  selectedDayTextColor: 'black',
  todayTextColor: 'white',
  todayBackgroundColor: 'red',
  dayTextColor: 'white',
  textDisabledColor: 'gray',
  selectedDotColor: 'white',
  arrowColor: 'white',
  monthTextColor: 'white',
  textDayFontWeight: '400',
  textMonthFontWeight: 'bold',
  textDayHeaderFontWeight: '300',
};

function Calendar({date, onDayPress}: CalendarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.weekDaysContainer}>
        {weekdays.map((weekday, index) => (
          <Text key={index} style={styles.weekDayLabel}>
            {weekday}
          </Text>
        ))}
      </View>

      <CalendarList
        hideArrows
        hideDayNames
        scrollEnabled
        pagingEnabled
        showScrollIndicator={false}
        theme={theme}
        calendarHeight={calendarHeight}
        pastScrollRange={0}
        futureScrollRange={24}
        markedDates={
          date ? {[date.toISOString().slice(0, 10)]: {selected: true}} : {}
        }
        onDayPress={day => {
          onDayPress(new Date(day.timestamp));
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: calendarHeight,
    overflow: 'hidden',
  },
  weekDaysContainer: {
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: 'lightgray',
    borderStyle: 'solid',
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  weekDayLabel: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'normal',
  },
});

export default Calendar;
