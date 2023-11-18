import React from 'react';
import { StyleSheet, View } from 'react-native';

export const DatingSwipeNoCard = () => {
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    elevation: 2,
    height: '80%',
    justifyContent: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.4,
  },
  image: {
    height: 80,
    width: '100%',
  },
  text: {
    fontWeight: 'bold',
    paddingBottom: 20,
  },
});
