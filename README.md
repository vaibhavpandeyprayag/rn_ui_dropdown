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
