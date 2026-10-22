import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import { colors } from './src/theme/colors';

const App = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
        <HomeScreen />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.screenBackground,
  },
});

export default App;
