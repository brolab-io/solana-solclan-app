import { Box } from 'native-base';
import React, { PropsWithChildren } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';

const topEdge: Edge[] = ['top'];

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box h="100%" backgroundColor="gray.800">
      <ImageBackground
        source={require('../assets/app_bg.png')}
        style={styles.container}
        resizeMode="cover">
        <SafeAreaView edges={topEdge}>{children}</SafeAreaView>
      </ImageBackground>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});
export default Layout;
