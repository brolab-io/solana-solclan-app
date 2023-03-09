import {Box} from 'native-base';
import React, {PropsWithChildren} from 'react';
import {ImageBackground, StyleSheet} from 'react-native';

const Layout: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <Box h="100%" backgroundColor="gray.800">
      <ImageBackground
        source={require('../../assets/app_bg.png')}
        style={styles.container}
        resizeMode="cover">
        {children}
      </ImageBackground>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
});
export default Layout;
