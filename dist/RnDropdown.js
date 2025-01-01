"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_native_1 = require("react-native");
const RnDropdown = ({ options, selectedOption, bindingProp, displayProp, onSearchTextChange, onSelectionChange, containerStyle, selectedOptionStyle, selectedOptionTextStyle, optionsStyle, optionsTextStyle, searchBoxStyle, searchTextStyle, placeholderTextColor, }) => {
    const [modalVisible, setModalVisible] = (0, react_1.useState)(false);
    const [selectedValue, setSelectedValue] = (0, react_1.useState)(selectedOption);
    const [filteredDataList, setFilteredDataList] = (0, react_1.useState)([]);
    const limitText = (text, length) => {
        if (text.length > length)
            return text.substring(0, length) + '...';
        return text;
    };
    (0, react_1.useEffect)(() => {
        if (onSelectionChange != null)
            onSelectionChange(selectedValue);
    }, [selectedValue]);
    (0, react_1.useEffect)(() => {
        setSelectedValue(selectedOption);
        if (onSelectionChange != null)
            onSelectionChange(selectedOption);
    }, [selectedOption]);
    (0, react_1.useEffect)(() => {
        setFilteredDataList(options);
    }, [options]);
    return (<react_native_1.SafeAreaView>
      <react_native_1.View style={{ ...styles.container, ...containerStyle }}>
        <react_native_1.View style={{ ...styles.selectedItemContainer, ...selectedOptionStyle }}>
          <react_native_1.Text style={{
            ...(selectedValue ? styles.selectedItemText : styles.placeholder),
            ...selectedOptionTextStyle,
        }}>
            {limitText(options?.filter(option => option[bindingProp] == selectedValue)?.[0]?.[displayProp] ?? 'Select', 20)}
          </react_native_1.Text>
        </react_native_1.View>
        {selectedValue != null && (<react_native_1.Pressable android_ripple={{ color: 'rgba(220, 220, 220, 1)' }} style={{ ...styles.expandButton }} onPress={() => setSelectedValue(null)}>
            <react_native_1.Image style={{ width: 24, height: 24, margin: 'auto' }} source={require('./close.png')}/>
          </react_native_1.Pressable>)}
        <react_native_1.Pressable android_ripple={{ color: 'rgba(220, 220, 220, 1)' }} style={{ ...styles.expandButton }} onPress={() => setModalVisible(true)}>
          <react_native_1.Image style={{ width: 24, height: 24, margin: 'auto' }} source={require('./caret.webp')}/>
        </react_native_1.Pressable>
      </react_native_1.View>
      <react_native_1.Modal animationType={'fade'} transparent={true} visible={modalVisible} onRequestClose={() => {
            setModalVisible(!modalVisible);
        }}>
        <react_native_1.Pressable style={styles.centeredView} onPress={() => setModalVisible(false)}>
          <react_native_1.View style={styles.modalView}>
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
        }} placeholder={'Search'} placeholderTextColor={placeholderTextColor} onChangeText={val => {
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
              <react_native_1.Pressable android_ripple={{ color: 'rgba(220, 220, 220, 1)' }} style={{ ...styles.expandButton }} onPress={() => setModalVisible(false)}>
                <react_native_1.Image style={{ width: 24, height: 24, margin: 'auto' }} source={require('./close.png')}/>
              </react_native_1.Pressable>
            </react_native_1.View>
            <react_native_1.FlatList style={{ minHeight: 100, maxHeight: 400 }} data={filteredDataList} renderItem={({ item }) => (<react_native_1.Pressable android_ripple={{ color: 'lightgray' }} key={item[bindingProp]} style={{ padding: 12, ...optionsStyle }} onPress={() => {
                setSelectedValue(item[bindingProp]);
                setFilteredDataList(options);
                setModalVisible(false);
            }}>
                  <react_native_1.Text style={{
                fontSize: 16,
                letterSpacing: 1,
                ...optionsTextStyle,
            }}>
                    {item[displayProp]}
                  </react_native_1.Text>
                </react_native_1.Pressable>)}/>
          </react_native_1.View>
        </react_native_1.Pressable>
      </react_native_1.Modal>
    </react_native_1.SafeAreaView>);
};
const styles = react_native_1.StyleSheet.create({
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
        width: react_native_1.Dimensions.get('screen').width,
        height: react_native_1.Dimensions.get('screen').height,
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
exports.default = RnDropdown;
