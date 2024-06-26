import Calendar from '@src/components/Calendar';
import TimePicker from '@src/components/TimePicker';
import React from 'react';
import {Text, SafeAreaView, StyleSheet} from 'react-native';

function CalendarScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Text>Calendar screen</Text>

      <Calendar />

      <TimePicker />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default CalendarScreen;
