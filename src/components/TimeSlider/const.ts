import {Dimensions} from 'react-native';

const {width: SCREEN_WIDTH} = Dimensions.get('screen');
const ITEM_WIDTH = 100;
const ITEM_HEIGHT = 60;
const TIME_SLOTS: string[] = [];

for (let hour = 0; hour < 12; hour++) {
  for (let minute = 0; minute < 60; minute += 15) {
    const formattedHour = hour.toString().padStart(2, '0');
    const formattedMinute = minute.toString().padStart(2, '0');

    TIME_SLOTS.push(`${formattedHour}:${formattedMinute}`);
  }
}

const TIME_SLOT_BREAKPOINTS = TIME_SLOTS.map(
  (_, index) => SCREEN_WIDTH / 2 - ITEM_WIDTH / 2 - index * ITEM_WIDTH,
);

export {ITEM_WIDTH, ITEM_HEIGHT, TIME_SLOTS, TIME_SLOT_BREAKPOINTS};
