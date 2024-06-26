import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  type ForwardedRef,
} from 'react';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
  type BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import {StyleSheet, Text} from 'react-native';
import TimeSlider from '../TimeSlider';

const snapPoints = ['50%', '75%'];

type TimePickerRef = {
  open: () => void;
};

type TimePickerProps = {
  date: Date | null;
};

function TimePicker({date}: TimePickerProps, ref: ForwardedRef<TimePickerRef>) {
  const bottomSheetRef = useRef<BottomSheet>(null);

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

  useImperativeHandle(ref, () => ({
    open: () => {
      bottomSheetRef.current?.snapToIndex(0);
    },
  }));

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      backdropComponent={renderBackdrop}>
      <BottomSheetView style={styles.contentContainer}>
        {date && <Text>Set availability on {date.toString()}</Text>}

        <TimeSlider label="Start work at" />

        <TimeSlider label="End work by" />
      </BottomSheetView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
  },
});

export type {TimePickerRef};

export default forwardRef(TimePicker);
