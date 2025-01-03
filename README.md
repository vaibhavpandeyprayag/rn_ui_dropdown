# rn_ui_dropdown

`rn_ui_dropdown` is a customizable dropdown component for React Native that allows you to easily add a dropdown menu with options, selection handling, and dynamic rendering.

## Usage

```typescript
import RnUiDropdown from 'rn_ui_dropdown';

const [selectedLocId, setSelectedLocId] = useState < any > null;
const locationList = [
  {value: 1, label: 'Delhi'},
  {value: 2, label: 'Mumbai'},
  {value: 3, label: 'Bengaluru'},
  {value: 4, label: 'Goa'},
  {value: 5, label: 'Chennai'},
  {value: 6, label: 'Jaipur'},
  {value: 7, label: 'Hyderabad'},
];

<RnUiDropdown
  options={locationList}
  bindingProp={'value'}
  displayProp={'label'}
  selectedOption={selectedLocId}
  onSelectionChange={(val: any) => setSelectedLocId(val)}
/>;
```

## Screenshots

<p align="left">
  <img src="https://raw.githubusercontent.com/vaibhavpandeyprayag/rn_dropdown/main/src/ss_default.png" alt="Screenshot 1" width="300" />
  <img src="https://raw.githubusercontent.com/vaibhavpandeyprayag/rn_dropdown/main/src/ss_options.png" alt="Screenshot 2" width="300" />
  <img src="https://raw.githubusercontent.com/vaibhavpandeyprayag/rn_dropdown/main/src/ss_selected.png" alt="Screenshot 3" width="300" />
</p>
  <img src="https://raw.githubusercontent.com/vaibhavpandeyprayag/rn_dropdown/main/src/ss_styled.png" alt="Screenshot 4" width="300" />

## Properties

### options: any[]

The list/array of object where every object represents an option.

### selectedOption: any

The variable/state which contains the selected option.

### bindingProp: string

The property of option which is stored in state specified as 'selectedOption'.

### displayProp: string

The property of option which is displayed when an option is selected.

### onSearchTextChange (optional): Function

The optional function which is called when search text is changed.
By default, when search text changes, it filters the options based on the text.

### onSelectionChange: Function

The function which is called when an option is selected.

### containerStyle (optional): ViewStyle | TextStyle | ImageStyle | FlexStyle

Style for overall dropdown.

### selectedOptionStyle (optional): ViewStyle | TextStyle | ImageStyle | FlexStyle

Style for the area of selected option.

### selectedOptionTextStyle (optional): ViewStyle | TextStyle | ImageStyle | FlexStyle

Style for the text of selected option.

### optionsStyle (optional): ViewStyle | TextStyle | ImageStyle | FlexStyle

Style for the options.

### optionsTextStyle (optional): ViewStyle | TextStyle | ImageStyle | FlexStyle

Style for the text of options.

### searchBoxStyle (optional): ViewStyle | TextStyle | ImageStyle | FlexStyle

Style for the search box.

### searchTextStyle (optional): ViewStyle | TextStyle | ImageStyle | FlexStyle

Style for the text inside search box.

### placeholderText (optional): string

Placeholder text for dropdown when no option is selected

### searchPlaceholderText (optional): string

Placeholder text for search box
