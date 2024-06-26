import Calendar from '@src/components/Calendar';
import TimePicker, {type TimePickerRef} from '@src/components/TimePicker';
import React, {useRef} from 'react';
import {Text, SafeAreaView, StyleSheet} from 'react-native';

const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

function CalendarScreen() {
  const timePickerRef = useRef<TimePickerRef>(null);

  const openTimePicker = () => {
    timePickerRef.current?.open();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text>Availability</Text>

      <Calendar onDayPress={openTimePicker} />

      <Text>Timezone: {timezone}</Text>

      <TimePicker ref={timePickerRef} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default CalendarScreen;
