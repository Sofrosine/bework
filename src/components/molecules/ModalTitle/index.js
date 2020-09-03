import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {colors, fonts} from '../../../utils';
import {Gap} from '../../atoms';

const ModalTitle = ({children, title}) => {
  // const handleClose = () => {
  //   dispatch({type: 'MODAL_CLOSE'});
  // };
  return (
    <View>
      <Modal
        style={{margin: 0}}
        // isVisible={isVisible}
        swipeDirection="down"
        // onSwipeComplete={handleClose}
        // onBackdropPress={handleClose}
      >
        <View style={styles.modalView}>
          <View style={styles.swipe} />
          <Text style={styles.h5Primary}>{title}</Text>
          <Gap height={16} />
          {children}
        </View>
      </Modal>
    </View>
  );
};

export default ModalTitle;

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: colors.background.white,
    bottom: 0,
    position: 'absolute',
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  h5Primary: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
  },
  swipe: {
    borderBottomWidth: 2,
    borderTopWidth: 2,
    width: 34,
    alignSelf: 'center',
    borderColor: colors.border.blur,
    padding: 1.5,
    marginBottom: 16,
  },
});
