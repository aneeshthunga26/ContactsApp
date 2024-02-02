import React from 'react';
import { SafeAreaView, StyleSheet, View, StatusBar } from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Contacts } from './src/features/contacts/Contacts';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  return (
    <GestureHandlerRootView style={styles.root}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.body}>
          <Contacts />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  body: {
    backgroundColor: Colors.white,
  },
});

export default App;
