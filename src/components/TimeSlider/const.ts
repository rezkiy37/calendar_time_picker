import {Dimensions} from 'react-native';

type TimeSlot = {
  time: string;
  period: string;
};

const {width: SCREEN_WIDTH} = Dimensions.get('screen');
const ITEM_WIDTH = 100;
const ITEM_HEIGHT = 60;
const TIME_SLOTS: TimeSlot[] = [];

for (let hour = 0; hour < 24; hour++) {
  for (let minute = 0; minute < 60; minute += 15) {
    const hourIn12HourFormat = hour % 12 === 0 ? 12 : hour % 12;
    const formattedHour = hourIn12HourFormat.toString().padStart(2, '0');
    const formattedMinute = minute.toString().padStart(2, '0');

    TIME_SLOTS.push({
      time: `${formattedHour}:${formattedMinute}`,
      period: hour < 12 ? 'AM' : 'PM',
    });

    if (hour === 23 && minute === 45) {
      TIME_SLOTS.push({
        time: '11:59',
        period: 'PM',
      });
    }
  }
}

const TIME_SLOT_BREAKPOINTS = TIME_SLOTS.map(
  (_, index) => SCREEN_WIDTH / 2 - ITEM_WIDTH / 2 - index * ITEM_WIDTH,
);

export type {TimeSlot};

export {ITEM_WIDTH, ITEM_HEIGHT, TIME_SLOTS, TIME_SLOT_BREAKPOINTS};
