/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
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

import {Colors} from 'react-native/Libraries/NewAppScreen';
import RnUiDropdown from './src/RnUiDropdown';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const [data, setData] = useState([
    {id: 1, name: 'Delhi'},
    {id: 2, name: 'Mumbai'},
    {id: 3, name: 'Gurjrat'},
    {id: 4, name: 'Goa'},
    {id: 5, name: 'Chennai'},
    {id: 6, name: 'Jaipur'},
    {id: 7, name: 'Hyderabad'},
    {id: 8, name: 'Bengaluru'},
    {id: 9, name: 'Goa'},
    {id: 10, name: 'Chennai'},
    {id: 11, name: 'Jaipur'},
    {id: 2, name: 'Hyderabad'},
  ]);
  const [val, setVal] = useState<any>([]);
  return (
    <SafeAreaView style={{}}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{
          padding: 10,
          marginVertical: 16,
          height: '100%',
          backgroundColor: 'rgb(226, 224, 224)',
        }}>
        {/* <View style={{marginVertical: 16}}> */}
        <RnUiDropdown
          multiSelect={true}
          options={data}
          selectedOption={val}
          bindingProp={'id'}
          displayProp={'name'}
          onSelectionChange={(val: any) => setVal(val)}
          containerStyle={{
            backgroundColor: 'white',
          }}
          placeholderText={'Select option'}
          searchPlaceholderText={'Search options'}
        />
      </ScrollView>
    </SafeAreaView>
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
