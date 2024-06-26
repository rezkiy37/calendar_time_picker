import Calendar from '@src/components/Calendar';
import TimePicker, {type TimePickerRef} from '@src/components/TimePicker';
import React, {useRef, useState} from 'react';
import {Text, SafeAreaView, StyleSheet} from 'react-native';

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
      <Text>Availability</Text>

      <Calendar onDayPress={openTimePicker} />

      <Text>Timezone: {timezone}</Text>

      <TimePicker ref={timePickerRef} date={selectedDate} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default CalendarScreen;
