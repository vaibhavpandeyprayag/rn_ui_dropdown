"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_native_1 = require("react-native");
const RnUiDropdown = ({ options, selectedOption, bindingProp, displayProp, multiSelect, onSearchTextChange, onSelectionChange, containerStyle, selectedOptionStyle, selectedOptionTextStyle, optionsStyle, optionsTextStyle, searchBoxStyle, searchTextStyle, placeholderText, searchPlaceholderText, }) => {
    const [modalVisible, setModalVisible] = (0, react_1.useState)(false);
    const [selectedValue, setSelectedValue] = (0, react_1.useState)(selectedOption || []);
    const [filteredDataList, setFilteredDataList] = (0, react_1.useState)([]);
    const [layout, setLayout] = (0, react_1.useState)('vertical');
    const [containerWidth, setContainerWidth] = (0, react_1.useState)(100);
    const [heightAccordScreenLayout, setHeightAccordScreenLayout] = (0, react_1.useState)(100);
    const limitText = (text, length) => {
        if (text.length > length)
            return text.substring(0, length) + '...';
        return text;
    };
    const alreadySelected = (id) => {
        return (selectedValue.filter(selectedId => selectedId == id).length > 0);
    };
    (0, react_1.useEffect)(() => {
        if (multiSelect != true)
            console.log('single select mode');
        else
            console.log('multi select mode on');
        console.log(Array.isArray(selectedValue));
        const { width, height } = react_native_1.Dimensions.get('screen');
        if (width < height)
            setLayout(prevState => 'vertical');
        else
            setLayout(prevState => 'horizontal');
        setHeightAccordScreenLayout(prevState => react_native_1.Dimensions.get('screen').height);
    }, []);
    (0, react_1.useEffect)(() => {
        if (multiSelect == true)
            onSelectionChange(selectedValue || []);
        else
            onSelectionChange(selectedValue);
    }, [selectedValue]);
    (0, react_1.useEffect)(() => {
        setSelectedValue(selectedOption);
        if (multiSelect == true)
            onSelectionChange(selectedOption || []);
        else
            onSelectionChange(selectedOption);
    }, [selectedOption]);
    (0, react_1.useEffect)(() => {
        setFilteredDataList(options);
    }, [options]);
    (0, react_1.useEffect)(() => {
        console.log('containerWidth >>', containerWidth);
    }, [containerWidth]);
    (0, react_1.useEffect)(() => {
        console.log('heightAccordScreenLayout >>', heightAccordScreenLayout);
    }, [heightAccordScreenLayout]);
    return (<react_native_1.SafeAreaView>
      <react_native_1.View style={{ ...styles.container, ...containerStyle }} onLayout={event => {
            const { width, height } = react_native_1.Dimensions.get('screen');
            if (width < height)
                setLayout(prevState => 'vertical');
            else
                setLayout(prevState => 'horizontal');
            setContainerWidth(event.nativeEvent.layout.width);
            setHeightAccordScreenLayout(prevState => react_native_1.Dimensions.get('screen').height);
        }}>
        <react_native_1.View style={{
            ...styles.selectedItemContainer,
            // backgroundColor: 'green',
            width: containerWidth -
                (multiSelect != true && selectedOption != null ? 96 : 48),
            ...selectedOptionStyle,
        }}>
          {multiSelect == true &&
            selectedValue &&
            selectedValue.length == 0 && (<react_native_1.Text style={{
                ...styles.placeholder,
                ...selectedOptionTextStyle,
            }} numberOfLines={1}>
                {options?.filter(option => option[bindingProp] == selectedValue)?.[0]?.[displayProp] ??
                placeholderText ??
                'Select'}
              </react_native_1.Text>)}
          {multiSelect == true &&
            selectedValue &&
            selectedValue.length > 0 &&
            selectedValue.map((val, ind) => {
                return (<react_native_1.View key={'selectedVal' + ind} style={{
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
                  <react_native_1.Text style={{
                        paddingVertical: 6,
                        maxWidth: containerWidth - 82,
                        letterSpacing: 1,
                        fontSize: 16,
                        fontWeight: 'semibold',
                    }} numberOfLines={1}>
                    {options.filter(option => option[bindingProp] == val)[0][displayProp]}
                  </react_native_1.Text>
                  <react_native_1.Pressable android_ripple={{ color: 'rgba(220, 220, 220, 1)' }} onPress={() => {
                        setSelectedValue(selectedValue.filter(id => id != val));
                    }}>
                    <react_native_1.Image style={{
                        width: 22,
                        height: 22,
                        // backgroundColor: 'yellow',
                        marginVertical: 'auto',
                    }} source={require('./close.png')}/>
                  </react_native_1.Pressable>
                </react_native_1.View>);
            })}
          {multiSelect != true && (<react_native_1.Text style={{
                ...(selectedValue
                    ? styles.selectedItemText
                    : styles.placeholder),
                ...selectedOptionTextStyle,
            }} numberOfLines={1}>
              {options?.filter(option => option[bindingProp] == selectedValue)?.[0]?.[displayProp] ??
                placeholderText ??
                'Select'}
            </react_native_1.Text>)}
        </react_native_1.View>
        {selectedValue != null && multiSelect != true && (<react_native_1.Pressable android_ripple={{ color: 'rgba(220, 220, 220, 1)' }} style={{
                minWidth: 48,
                minHeight: 48,
                height: '100%',
            }} onPress={() => setSelectedValue(null)}>
            <react_native_1.Image style={{ width: 24, height: 24, margin: 'auto' }} source={require('./close.png')}/>
          </react_native_1.Pressable>)}
        <react_native_1.Pressable android_ripple={{ color: 'rgba(220, 220, 220, 1)' }} style={{
            width: 48,
            minHeight: 48,
            height: '100%',
        }} onPress={() => {
            setFilteredDataList(options);
            setModalVisible(true);
        }}>
          <react_native_1.Image style={{ width: 24, height: 24, margin: 'auto' }} source={require('./caret.webp')}/>
        </react_native_1.Pressable>
      </react_native_1.View>
      <react_native_1.Modal animationType={'fade'} transparent={true} visible={modalVisible} onRequestClose={() => {
            setModalVisible(!modalVisible);
        }}>
        <react_native_1.Pressable style={styles.centeredView} onPress={() => setModalVisible(false)}>
          <react_native_1.View style={{
            ...styles.modalView,
            maxWidth: containerWidth - (layout == 'horizontal' ? 72 : 48),
            maxHeight: heightAccordScreenLayout - (layout == 'horizontal' ? 100 : 180),
        }}>
            <react_native_1.View style={{
            display: 'flex',
            flexDirection: 'row',
            borderColor: 'lightgray',
            borderBottomWidth: 1,
            ...searchBoxStyle,
        }}>
              <react_native_1.TextInput style={{
            flexGrow: 1,
            padding: 12,
            fontSize: 16,
            borderTopLeftRadius: 4,
            width: '80%',
            ...searchTextStyle,
        }} placeholder={searchPlaceholderText ?? 'Search'} onChangeText={val => {
            if (onSearchTextChange != null) {
                onSearchTextChange(val);
            }
            else if (val == null || val == '') {
                setFilteredDataList(options);
            }
            else {
                let filteredData = options.filter((data) => data[displayProp]
                    .toLowerCase()
                    .indexOf(val.toLowerCase()) != -1);
                setFilteredDataList(filteredData);
            }
        }}/>
              <react_native_1.Pressable android_ripple={{ color: 'rgba(220, 220, 220, 1)' }} onPress={() => setModalVisible(false)}>
                <react_native_1.Image style={{
            width: 24,
            height: 24,
            margin: 'auto',
            marginHorizontal: 4,
        }} source={require('./close.png')}/>
              </react_native_1.Pressable>
            </react_native_1.View>
            {multiSelect != true && (<react_native_1.FlatList style={{ minHeight: 100, maxHeight: 400 }} data={filteredDataList} keyExtractor={(item, index) => item[bindingProp].toString() + '-' + index} renderItem={({ item, index }) => (<react_native_1.Pressable android_ripple={{ color: 'lightgray' }} key={'singleSelectOption' + index} style={{ padding: 12, ...optionsStyle }} onPress={() => {
                    setSelectedValue(item[bindingProp]);
                    setModalVisible(false);
                }}>
                    <react_native_1.Text style={{
                    fontSize: 16,
                    letterSpacing: 1,
                    ...optionsTextStyle,
                }} numberOfLines={1}>
                      {item[displayProp]}
                    </react_native_1.Text>
                  </react_native_1.Pressable>)}/>)}
            {multiSelect == true && (<react_native_1.FlatList style={{ minHeight: 100, maxHeight: 500 }} data={filteredDataList} keyExtractor={(item, index) => item[bindingProp].toString() + '-' + index} renderItem={({ item, index }) => (<react_native_1.Pressable android_ripple={{ color: 'lightgray' }} style={{
                    padding: 12,
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 16,
                    alignItems: 'center',
                    ...optionsStyle,
                }} onPress={() => {
                    if (alreadySelected(item[bindingProp])) {
                        setSelectedValue((values) => {
                            let newValues = values.filter(value => value != item[bindingProp]);
                            return newValues;
                        });
                    }
                    else {
                        setSelectedValue((values) => {
                            let newValues = [...values, item[bindingProp]];
                            newValues.sort((a, b) => a - b);
                            return newValues;
                        });
                    }
                }}>
                    <react_native_1.View style={{}}>
                      <react_native_1.Image source={selectedValue?.filter(optionId => optionId == item[bindingProp]).length > 0
                    ? require('./checkbox.png')
                    : ''} resizeMode={'center'} resizeMethod={'scale'} style={{
                    width: 18,
                    height: 18,
                    borderRadius: 2,
                    backgroundColor: selectedValue?.filter(optionId => optionId == item[bindingProp]).length > 0
                        ? 'rgb(4, 154, 236)'
                        : 'lightgray',
                    borderWidth: 1,
                    borderColor: selectedValue?.filter(optionId => optionId == item[bindingProp]).length > 0
                        ? 'rgb(4, 154, 236)'
                        : 'lightgray',
                }}/>
                    </react_native_1.View>
                    <react_native_1.Text style={{
                    fontSize: 16,
                    letterSpacing: 1,
                    ...optionsTextStyle,
                }} numberOfLines={1}>
                      {item[displayProp]}
                    </react_native_1.Text>
                  </react_native_1.Pressable>)}/>)}
          </react_native_1.View>
        </react_native_1.Pressable>
      </react_native_1.Modal>
    </react_native_1.SafeAreaView>);
};
const styles = react_native_1.StyleSheet.create({
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
exports.default = RnUiDropdown;
