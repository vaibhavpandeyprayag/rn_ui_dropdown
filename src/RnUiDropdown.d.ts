import React from 'react';
import {ViewStyle, TextStyle, ImageStyle, FlexStyle} from 'react-native';

export interface RnUiDropdownProps {
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

declare const RnDropdown: React.FC<RnUiDropdownProps>;
export default RnDropdown;
