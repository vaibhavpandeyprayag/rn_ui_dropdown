import {useEffect, useRef, useState} from 'react';
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
  multiSelect?: boolean;
  onSearchTextChange?: Function;
  onSelectionChange: Function;
  containerStyle?: ViewStyle | TextStyle | ImageStyle | FlexStyle;
  selectedOptionStyle?: ViewStyle | TextStyle | ImageStyle | FlexStyle;
  selectedOptionTextStyle?: ViewStyle | TextStyle | ImageStyle | FlexStyle;
  optionsStyle?: ViewStyle | TextStyle | ImageStyle | FlexStyle;
  optionsTextStyle?: ViewStyle | TextStyle | ImageStyle | FlexStyle;
  searchBoxStyle?: ViewStyle | TextStyle | ImageStyle | FlexStyle;
  searchTextStyle?: ViewStyle | TextStyle | ImageStyle | FlexStyle;
  placeholderText?: string;
  searchPlaceholderText?: string;
}

const RnUiDropdown = ({
  options,
  selectedOption,
  bindingProp,
  displayProp,
  multiSelect,
  onSearchTextChange,
  onSelectionChange,
  containerStyle,
  selectedOptionStyle,
  selectedOptionTextStyle,
  optionsStyle,
  optionsTextStyle,
  searchBoxStyle,
  searchTextStyle,
  placeholderText,
  searchPlaceholderText,
}: PropsInterface) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState<any>(selectedOption || []);
  const [filteredDataList, setFilteredDataList] = useState<any>([]);

  const [layout, setLayout] = useState<'horizontal' | 'vertical'>('vertical');
  const [containerWidth, setContainerWidth] = useState(100);
  const [heightAccordScreenLayout, setHeightAccordScreenLayout] = useState(100);

  const limitText = (text: string, length: number) => {
    if (text.length > length) return text.substring(0, length) + '...';
    return text;
  };

  const alreadySelected = (id: any) => {
    return (
      (selectedValue as any[]).filter(selectedId => selectedId == id).length > 0
    );
  };

  useEffect(() => {
    if (multiSelect != true) console.log('single select mode');
    else console.log('multi select mode on');
    console.log(Array.isArray(selectedValue));

    const {width, height} = Dimensions.get('screen');
    if (width < height) setLayout(prevState => 'vertical');
    else setLayout(prevState => 'horizontal');
    setHeightAccordScreenLayout(prevState => Dimensions.get('screen').height);
  }, []);
  useEffect(() => {
    if (multiSelect == true) onSelectionChange(selectedValue || []);
    else onSelectionChange(selectedValue);
  }, [selectedValue]);
  useEffect(() => {
    setSelectedValue(selectedOption);
    if (multiSelect == true) onSelectionChange(selectedOption || []);
    else onSelectionChange(selectedOption);
  }, [selectedOption]);
  useEffect(() => {
    setFilteredDataList(options);
  }, [options]);

  useEffect(() => {
    console.log('containerWidth >>', containerWidth);
  }, [containerWidth]);
  useEffect(() => {
    console.log('heightAccordScreenLayout >>', heightAccordScreenLayout);
  }, [heightAccordScreenLayout]);

  return (
    <SafeAreaView>
      <View
        style={{...styles.container, ...containerStyle}}
        onLayout={event => {
          const {width, height} = Dimensions.get('screen');
          if (width < height) setLayout(prevState => 'vertical');
          else setLayout(prevState => 'horizontal');

          setContainerWidth(event.nativeEvent.layout.width);
          setHeightAccordScreenLayout(
            prevState => Dimensions.get('screen').height,
          );
        }}>
        <View
          style={{
            ...styles.selectedItemContainer,
            // backgroundColor: 'green',
            width:
              containerWidth -
              (multiSelect != true && selectedOption != null ? 96 : 48),
            ...selectedOptionStyle,
          }}>
          {multiSelect == true &&
            selectedValue &&
            selectedValue.length == 0 && (
              <Text
                style={{
                  ...styles.placeholder,
                  ...selectedOptionTextStyle,
                }}
                numberOfLines={1}>
                {options?.filter(
                  option => option[bindingProp] == selectedValue,
                )?.[0]?.[displayProp] ??
                  placeholderText ??
                  'Select'}
              </Text>
            )}
          {multiSelect == true &&
            selectedValue &&
            selectedValue.length > 0 &&
            (selectedValue as any[]).map((val, ind) => {
              return (
                <View
                  key={'selectedVal' + ind}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginVertical: 6,
                    marginHorizontal: 4,
                    paddingLeft: 6,
                    backgroundColor: 'rgb(187, 222, 243)',
                    borderRadius: 4,
                    gap: 2,
                    maxWidth: containerWidth - 58,
                  }}>
                  <Text
                    style={{
                      paddingVertical: 6,
                      maxWidth: containerWidth - 82,
                      letterSpacing: 1,
                      fontSize: 16,
                      fontWeight: 'semibold',
                    }}
                    numberOfLines={1}>
                    {
                      options.filter(option => option[bindingProp] == val)[0][
                        displayProp
                      ]
                    }
                  </Text>
                  <Pressable
                    android_ripple={{color: 'rgba(220, 220, 220, 1)'}}
                    onPress={() => {
                      setSelectedValue(
                        (selectedValue as any[]).filter(id => id != val),
                      );
                    }}>
                    <Image
                      style={{
                        width: 22,
                        height: 22,
                        // backgroundColor: 'yellow',
                        marginVertical: 'auto',
                      }}
                      source={require('./close.png')}
                    />
                  </Pressable>
                </View>
              );
            })}
          {multiSelect != true && (
            <Text
              style={{
                ...(selectedValue
                  ? styles.selectedItemText
                  : styles.placeholder),
                ...selectedOptionTextStyle,
              }}
              numberOfLines={1}>
              {options?.filter(
                option => option[bindingProp] == selectedValue,
              )?.[0]?.[displayProp] ??
                placeholderText ??
                'Select'}
            </Text>
          )}
        </View>
        {selectedValue != null && multiSelect != true && (
          <Pressable
            android_ripple={{color: 'rgba(220, 220, 220, 1)'}}
            style={{
              minWidth: 48,
              minHeight: 48,
              height: '100%',
            }}
            onPress={() => setSelectedValue(null)}>
            <Image
              style={{width: 24, height: 24, margin: 'auto'}}
              source={require('./close.png')}
            />
          </Pressable>
        )}
        <Pressable
          android_ripple={{color: 'rgba(220, 220, 220, 1)'}}
          style={{
            width: 48,
            minHeight: 48,
            height: '100%',
          }}
          onPress={() => {
            setFilteredDataList(options);
            setModalVisible(true);
          }}>
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
          <View
            style={{
              ...styles.modalView,
              maxWidth: containerWidth - (layout == 'horizontal' ? 72 : 48),
              maxHeight:
                heightAccordScreenLayout - (layout == 'horizontal' ? 100 : 180),
            }}>
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
                placeholder={searchPlaceholderText ?? 'Search'}
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
                onPress={() => setModalVisible(false)}>
                <Image
                  style={{
                    width: 24,
                    height: 24,
                    margin: 'auto',
                    marginHorizontal: 4,
                  }}
                  source={require('./close.png')}
                />
              </Pressable>
            </View>
            {multiSelect != true && (
              <FlatList
                style={{minHeight: 100, maxHeight: 400}}
                data={filteredDataList}
                keyExtractor={(item, index) =>
                  item[bindingProp].toString() + '-' + index
                }
                renderItem={({item, index}: any) => (
                  <Pressable
                    android_ripple={{color: 'lightgray'}}
                    key={'singleSelectOption' + index}
                    style={{padding: 12, ...optionsStyle}}
                    onPress={() => {
                      setSelectedValue(item[bindingProp]);
                      setModalVisible(false);
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        letterSpacing: 1,
                        ...optionsTextStyle,
                      }}
                      numberOfLines={1}>
                      {item[displayProp]}
                    </Text>
                  </Pressable>
                )}
              />
            )}
            {multiSelect == true && (
              <FlatList
                style={{minHeight: 100, maxHeight: 500}}
                data={filteredDataList}
                keyExtractor={(item, index) =>
                  item[bindingProp].toString() + '-' + index
                }
                renderItem={({item, index}: any) => (
                  <Pressable
                    android_ripple={{color: 'lightgray'}}
                    style={{
                      padding: 12,
                      display: 'flex',
                      flexDirection: 'row',
                      gap: 16,
                      alignItems: 'center',
                      ...optionsStyle,
                    }}
                    onPress={() => {
                      if (alreadySelected(item[bindingProp])) {
                        setSelectedValue((values: any[]) => {
                          let newValues = values.filter(
                            value => value != item[bindingProp],
                          );
                          return newValues;
                        });
                      } else {
                        setSelectedValue((values: number[]) => {
                          let newValues = [...values, item[bindingProp]];
                          newValues.sort((a, b) => a - b);
                          return newValues;
                        });
                      }
                    }}>
                    <View style={{}}>
                      <Image
                        source={
                          (selectedValue as any[])?.filter(
                            optionId => optionId == item[bindingProp],
                          ).length > 0
                            ? require('./checkbox.png')
                            : ''
                        }
                        resizeMode={'center'}
                        resizeMethod={'scale'}
                        style={{
                          width: 18,
                          height: 18,
                          borderRadius: 2,
                          backgroundColor:
                            (selectedValue as any[])?.filter(
                              optionId => optionId == item[bindingProp],
                            ).length > 0
                              ? 'rgb(4, 154, 236)'
                              : 'lightgray',
                          borderWidth: 1,
                          borderColor:
                            (selectedValue as any[])?.filter(
                              optionId => optionId == item[bindingProp],
                            ).length > 0
                              ? 'rgb(4, 154, 236)'
                              : 'lightgray',
                        }}
                      />
                    </View>
                    <Text
                      style={{
                        fontSize: 16,
                        letterSpacing: 1,
                        ...optionsTextStyle,
                      }}
                      numberOfLines={1}>
                      {item[displayProp]}
                    </Text>
                  </Pressable>
                )}
              />
            )}
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
    alignItems: 'flex-start',
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
  },
  selectedItemContainer: {
    // flexGrow: 1,
    display: 'flex',

    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  selectedItemText: {
    width: '100%',
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
  centeredView: {
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
  },
});

export default RnUiDropdown;
