import Calendar from '@src/components/Calendar';
import TimePicker, {type TimePickerRef} from '@src/components/TimePicker';
import React, {useRef, useState} from 'react';
import {Text, SafeAreaView, StyleSheet, View} from 'react-native';

const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const timePickerRef = useRef<TimePickerRef>(null);

  const openTimePicker = (date: Date) => {
    setSelectedDate(date);
    timePickerRef.current?.open();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>Availability</Text>
      </View>

      <Calendar date={selectedDate} onDayPress={openTimePicker} />

      <View style={styles.timezoneContainer}>
        <Text>{timezone}</Text>
      </View>

      <TimePicker ref={timePickerRef} date={selectedDate} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    padding: 16,
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  timezoneContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    backgroundColor: 'lightgray',
  },
});

export default CalendarScreen;
