
import React, { useEffect } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import RNSoundLevel from 'react-native-sound-level'
import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import { AudioMonitor } from './AudioMonitor';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';


  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1
  };


  const MONITOR_INTERVAL = 250 // in ms

  // const requestPermission = async () => {
  //   // request permission to access microphone
  //   // ...
  //   if (success) {
  //     // start monitoring
  //     RNSoundLevel.start()
  //     // you may also specify a monitor interval (default is 250ms)
  //     RNSoundLevel.start(MONITOR_INTERVAL)

  //     // or add even more options
  //     RNSoundLevel.start({
  //       monitorInterval: MONITOR_INTERVAL,
  //       samplingRate: 16000, // default is 22050
  //     })
  //   }
  // }

  // useEffect(() => {
  //   RNSoundLevel.onNewFrame = (data) => {
  //     // see "Returned data" section below
  //     console.log('Sound level info', data)
  //   }

  //   return () => {
  //     // don't forget to stop it
  //     RNSoundLevel.stop()
  //   }
  // }, [])

  return (
    <View style={{ flex: 1 }}>

      <AudioMonitor />

    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
