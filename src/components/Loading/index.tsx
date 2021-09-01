import React from 'react';
import { View, Modal, StyleSheet } from 'react-native';

import LottieView from 'lottie-react-native';

interface ILoadingProps {
  visible: boolean;
  close: (param: any) => void;
}

export function Loading({ visible, close }: ILoadingProps) {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={() => close(visible)}
      >
        <View style={styles.centeredView}>
          <LottieView
            source={require('../../animations/loading.json')}
            autoPlay
            loop
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
});
