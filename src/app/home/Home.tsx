import React, {PropsWithChildren} from 'react';
import {Text} from 'native-base';
import {StyleSheet, View} from 'react-native';

const HomeScreen: React.FC<PropsWithChildren> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
