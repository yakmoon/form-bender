# React form-bender

A simple and quick way to create and handle forms

## Install

npm:

```
npm install @yakmoon/form-bender
```

yarn

```
yarn add @yakmoon/form-bender
```

Once the installation is completed, You can start using the components by importing them from:

```
import { FormTextInput, TextInput, useFormManager } from '@yakmoon/form-bender'
```

## Why form-bender?

Form-bender makes forms easier by taking the hassle out of working with form-state, errors, validation, and inputs. it has a great input restriction on numbers & prices, fantastic parser & correct outs.

## FormTextInput

This is the main input component it accepts multiple validation strategies, and you can rely on `useFormManager` to handle the form state for you.

> the default validation strategy is `any`

you can use this component like this in your code:

```
import { useFormManager, FormTextInput } from "@yakmoon/form-bender";
function App() {
  const folder = useFormManager({ name: "", age: 18, email: "" });
  return (
    <div>
      <FormTextInput name="name" label="Name" folder={folder} strategy="text" />
      <FormTextInput name="age" label="Age" folder={folder} strategy="number" />
      <FormTextInput name="email" label="Email" folder={folder} strategy="email" />
    </div>
  );
}
export default App;
```

### Strategies

all these strategies will return a string and it accepts only a string or number as an initial value.
other data types like `array`, `objects` etc... will disable the input.

`text` will not throw any error except for the data type error.

`email` will show a validation error when the inputted value is not an email.

`username` will show a validation error when the inputted value is not a username.

`password` will show a validation error when the inputted value is not a strong password [at least one uppercase] [at least one uppercase] [at least one number] [at least one symbol] [at least 8 characters].

`number` will parse strings and always return a number. it will not throw any error except for a data type error.

`price` will parse strings and always return a price like `10.00` with fixed cents, so 45.1 is returned `45.10`. it will not throw any error except for a data type error.

`any` will allow string or number but always output string. it will not throw any error except for a data type error.

## TextInput

This component is very similar to `FormTextInput`, but you should not use it with `useFormManager` although it's possible to do that, it's not recommended.

It's better to look at this component as a simple Input component, here is an example of how to use it:

```
import { TextInput } from "@yakmoon/form-bender";
function App() {
  const [state, setState] = useState({ name: "", age: "" });
  const handleChange = useCallback((value: string, key: string) => {
    setState((prev) => ({ ...prev, [key]: value }));
  }, []);
  return (
    <div>
      <TextInput name="name" label="Name" value={state.name} onChange={handleChange} />
      <TextInput name="age" label="Age" value={state.age} onChange={handleChange} />
    </div>
  );
}
```

## useFormManager

This is the form Manager, it will reurn the `folder` that is used by `FormTextInput`, `Folder` = { state, action }:

### state

`dirty`: shows whether the form has been edited.

`initialValues`: Holds the current form's version initial values.

`values`: Holds the live values derived from the inputs.

`errors`: Holds the errors derived from the inputs.

`touched`: Marks the touched inputs, it is triggered by onBlur.

`version`: The current version of the form. changing this value will update the form and inputs will reset.

### action

`onChange`: used to change a value in the state, use this carefully! calling this method will re-render the component.

`reset`: used to reset the form to initialValues.

`clear`: used to clear the values in the form of an empty string.

`update`: used to create a new form structure. it will reset & overwrite with new form values.

`get`: will return { name, value, touched, errors, initialValue } of a specific field.
