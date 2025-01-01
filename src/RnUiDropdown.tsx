import {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  FlexStyle,
  Image,
  ImageStyle,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

interface PropsInterface {
  options: any[];
  selectedOption: any;
  bindingProp: string;
  displayProp: string;
  onSearchTextChange?: Function;
  onSelectionChange: Function;
  containerStyle?: ViewStyle | TextStyle | ImageStyle | FlexStyle;
  selectedOptionStyle?: ViewStyle | TextStyle | ImageStyle | FlexStyle;
  selectedOptionTextStyle?: ViewStyle | TextStyle | ImageStyle | FlexStyle;
  optionsStyle?: ViewStyle | TextStyle | ImageStyle | FlexStyle;
  optionsTextStyle?: ViewStyle | TextStyle | ImageStyle | FlexStyle;
  searchBoxStyle?: ViewStyle | TextStyle | ImageStyle | FlexStyle;
  searchTextStyle?: ViewStyle | TextStyle | ImageStyle | FlexStyle;
  placeholderTextColor?: string;
}

const RnUiDropdown = ({
  options,
  selectedOption,
  bindingProp,
  displayProp,
  onSearchTextChange,
  onSelectionChange,
  containerStyle,
  selectedOptionStyle,
  selectedOptionTextStyle,
  optionsStyle,
  optionsTextStyle,
  searchBoxStyle,
  searchTextStyle,
  placeholderTextColor,
}: PropsInterface) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(selectedOption);
  const [filteredDataList, setFilteredDataList] = useState<any>([]);

  const limitText = (text: string, length: number) => {
    if (text.length > length) return text.substring(0, length) + '...';
    return text;
  };

  useEffect(() => {
    if (onSelectionChange != null) onSelectionChange(selectedValue);
  }, [selectedValue]);
  useEffect(() => {
    setSelectedValue(selectedOption);
    if (onSelectionChange != null) onSelectionChange(selectedOption);
  }, [selectedOption]);
  useEffect(() => {
    setFilteredDataList(options);
  }, [options]);
  return (
    <SafeAreaView>
      <View style={{...styles.container, ...containerStyle}}>
        <View style={{...styles.selectedItemContainer, ...selectedOptionStyle}}>
          <Text
            style={{
              ...(selectedValue ? styles.selectedItemText : styles.placeholder),
              ...selectedOptionTextStyle,
            }}>
            {limitText(
              options?.filter(
                option => option[bindingProp] == selectedValue,
              )?.[0]?.[displayProp] ?? 'Select',
              20,
            )}
          </Text>
        </View>
        {selectedValue != null && (
          <Pressable
            android_ripple={{color: 'rgba(220, 220, 220, 1)'}}
            style={{...styles.expandButton}}
            onPress={() => setSelectedValue(null)}>
            <Image
              style={{width: 24, height: 24, margin: 'auto'}}
              source={require('./close.png')}
            />
          </Pressable>
        )}
        <Pressable
          android_ripple={{color: 'rgba(220, 220, 220, 1)'}}
          style={{...styles.expandButton}}
          onPress={() => setModalVisible(true)}>
          <Image
            style={{width: 24, height: 24, margin: 'auto'}}
            source={require('./caret.webp')}
          />
        </Pressable>
      </View>
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <Pressable
          style={styles.centeredView}
          onPress={() => setModalVisible(false)}>
          <View style={styles.modalView}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                borderColor: 'lightgray',
                borderBottomWidth: 1,
                ...searchBoxStyle,
              }}>
              <TextInput
                style={{
                  flexGrow: 1,
                  padding: 12,
                  fontSize: 16,
                  borderTopLeftRadius: 4,
                  width: '80%',
                  ...searchTextStyle,
                }}
                placeholder={'Search'}
                placeholderTextColor={placeholderTextColor}
                onChangeText={val => {
                  if (onSearchTextChange != null) {
                    onSearchTextChange(val);
                  } else if (val == null || val == '') {
                    setFilteredDataList(options);
                  } else {
                    let filteredData = options.filter(
                      (data: any) =>
                        data[displayProp]
                          .toLowerCase()
                          .indexOf(val.toLowerCase()) != -1,
                    );
                    setFilteredDataList(filteredData);
                  }
                }}
              />
              <Pressable
                android_ripple={{color: 'rgba(220, 220, 220, 1)'}}
                style={{...styles.expandButton}}
                onPress={() => setModalVisible(false)}>
                <Image
                  style={{width: 24, height: 24, margin: 'auto'}}
                  source={require('./close.png')}
                />
              </Pressable>
            </View>
            <FlatList
              style={{minHeight: 100, maxHeight: 400}}
              data={filteredDataList}
              renderItem={({item}: any) => (
                <Pressable
                  android_ripple={{color: 'lightgray'}}
                  key={item[bindingProp]}
                  style={{padding: 12, ...optionsStyle}}
                  onPress={() => {
                    setSelectedValue(item[bindingProp]);
                    setFilteredDataList(options);
                    setModalVisible(false);
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      letterSpacing: 1,
                      ...optionsTextStyle,
                    }}>
                    {item[displayProp]}
                  </Text>
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    borderColor: 'gray',
    borderTopWidth: 0,
    borderStartWidth: 0,
    borderEndWidth: 0,
    borderWidth: 1,
  },
  selectedItemContainer: {
    flexGrow: 1,
  },
  selectedItemText: {
    padding: 12,
    letterSpacing: 1,
    fontSize: 16,
    fontWeight: 'semibold',
  },
  placeholder: {
    padding: 12,
    letterSpacing: 1,
    fontSize: 16,
    fontWeight: 'semibold',
    color: 'gray',
  },
  expandButton: {
    width: 44,
  },
  centeredView: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    backgroundColor: 'rgba(120, 120, 120, 0.4)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    position: 'relative',
    backgroundColor: 'white',
    boxShadow: '0.4 0.4 1 gray',
    borderRadius: 4,
    width: '80%',
  },
});

export default RnUiDropdown;
