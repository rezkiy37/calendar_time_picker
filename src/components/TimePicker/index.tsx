import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
  type ForwardedRef,
} from 'react';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFooter,
  BottomSheetView,
  type BottomSheetBackdropProps,
  type BottomSheetFooterProps,
} from '@gorhom/bottom-sheet';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import TimeSlider, {type TimeSliderRef} from '../TimeSlider';
import {type TimeSlot} from '../TimeSlider/const';

type TimePickerRef = {
  open: () => void;
};

type TimePickerProps = {
  date: Date | null;
  onSetTime: (start: TimeSlot, end: TimeSlot) => void;
};

const snapPoints = ['50%'];

const defaultStartTime: TimeSlot = {
  time: '06:00',
  period: 'AM',
};

const defaultEndTime: TimeSlot = {
  time: '08:00',
  period: 'PM',
};

function TimePicker(
  {date, onSetTime}: TimePickerProps,
  ref: ForwardedRef<TimePickerRef>,
) {
  const [startTime, setStartTime] = useState<TimeSlot | null>(null);
  const [endTime, setEndTime] = useState<TimeSlot | null>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const startTimeSliderRef = useRef<TimeSliderRef>(null);
  const endTimeSliderRef = useRef<TimeSliderRef>(null);

  const formattedDate = date
    ? new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
      }).format(date)
    : '';

  const renderBackdrop = useCallback(
    (bottomSheetBackdropProps: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...bottomSheetBackdropProps}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    [],
  );

  const renderFooter = useCallback(
    (bottomSheetFooterProps: BottomSheetFooterProps) => {
      const onPress = () => {
        if (!startTime || !endTime) {
          return;
        }

        onSetTime(startTime, endTime);
        bottomSheetRef.current?.close();
      };

      return (
        <BottomSheetFooter {...bottomSheetFooterProps} bottomInset={24}>
          <View style={styles.footerContainer}>
            <TouchableOpacity
              style={styles.setTimeButton}
              activeOpacity={0.7}
              onPress={onPress}>
              <Text style={styles.setTimeButtonText}>Set time</Text>
            </TouchableOpacity>
          </View>
        </BottomSheetFooter>
      );
    },
    [startTime, endTime, onSetTime],
  );

  useImperativeHandle(ref, () => ({
    open: () => {
      bottomSheetRef.current?.snapToIndex(0);
    },
  }));

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      backgroundStyle={styles.background}
      snapPoints={snapPoints}
      enablePanDownToClose
      handleStyle={styles.handle}
      enableContentPanningGesture={false}
      backdropComponent={renderBackdrop}
      footerComponent={renderFooter}
      onClose={() => {
        startTimeSliderRef.current?.reset();
        endTimeSliderRef.current?.reset();
      }}>
      <BottomSheetView style={styles.contentContainer}>
        <View style={styles.header}>
          {!!formattedDate && (
            <Text style={styles.title}>
              Set availability on {formattedDate}
            </Text>
          )}

          <TouchableOpacity
            style={styles.closeButton}
            activeOpacity={0.7}
            onPress={() => bottomSheetRef.current?.close()}
          />
        </View>

        <TimeSlider
          ref={startTimeSliderRef}
          label="Start work at"
          defaultValue={defaultStartTime}
          onTimeChange={setStartTime}
        />

        <TimeSlider
          ref={endTimeSliderRef}
          label="End work by"
          defaultValue={defaultEndTime}
          onTimeChange={setEndTime}
        />
      </BottomSheetView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 24,
    flex: 1,
    backgroundColor: 'grey',
  },
  handle: {
    borderTopWidth: 1,
    borderColor: 'lightgray',
    borderStyle: 'solid',
    backgroundColor: 'grey',
  },
  background: {
    backgroundColor: 'grey',
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    borderStyle: 'solid',
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    width: 24,
    height: 24,
    backgroundColor: 'white',
  },
  footerContainer: {
    padding: 16,
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: 'lightgray',
    borderStyle: 'solid',
    backgroundColor: 'grey',
  },
  setTimeButton: {
    width: '100%',
    padding: 16,
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: 'green',
  },
  setTimeButtonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export type {TimePickerRef};

export default forwardRef(TimePicker);
