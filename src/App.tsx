import React from 'react';
import CalendarScreen from './screens/CalendarScreen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';

function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <CalendarScreen />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
