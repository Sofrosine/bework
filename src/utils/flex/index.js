import {StyleSheet} from 'react-native';
import {colors} from '../colors';

export const flexStyle = StyleSheet.create({
  safeContainerWhite: {
    flex: 1,
    backgroundColor: colors.background.white,
  },
  containerWhite: {
    flex: 1,
    backgroundColor: colors.background.white,
    paddingHorizontal: 16,
  },
  containerFloatWhite: {
    backgroundColor: colors.background.white,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  content: {
    flex: 1,
  },
  alignSelfCenter: {
    alignSelf: 'center',
  },
  alignSelfEnd: {
    alignSelf: 'flex-end',
  },
  alignItemsCenter: {
    alignItems: 'center',
  },
  justifyContentCenter: {
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  rowJustifyCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rowAlignCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowAlignCenterWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowBetweenCenter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowBetweenCenterWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  rowEvenly: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  rowEvenlyCenter: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  growText: {flexGrow: 1, width: 0},
  shadow: {
    shadowColor: 'gray',
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
});
