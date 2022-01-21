//node_modules
import { FormikContextType } from "formik";
import { useCallback } from "react";
import clone from "lodash/clone";

type SetFieldType = (field: string, value: any, shouldValidate?: boolean) => any;

function moveUpDisabledLocal(index: number) {
  return index === 0;
}

function moveDownDisabledLocal(value: string[], index: number) {
  return index === value.length - 1;
}

function moveUpLocal(name: string, value: string[], setFieldValue: SetFieldType, index: number) {
  const array = clone(value);
  const temp = array[index - 1];
  array[index - 1] = array[index];
  array[index] = temp;
  setFieldValue(name, array);
}

function moveDownLocal(name: string, value: string[], setFieldValue: SetFieldType, index: number) {
  const array = clone(value);
  const temp = array[index + 1];
  array[index + 1] = array[index];
  array[index] = temp;
  setFieldValue(name, array);
}

function addItemLocal(name: string, value: string[], setFieldValue: SetFieldType) {
  const array = clone(value);
  array.push("");
  setFieldValue(name, array);
}

function removeItemLocal(name: string, value: string[], setFieldValue: SetFieldType, index: number) {
  const array = clone(value);
  array.splice(index, 1);
  setFieldValue(name, array);
}

function useFormikArrayModifier(name: string, value: string[], setFieldValue: SetFieldType) {
  const addItem = useCallback(() => addItemLocal(name, value, setFieldValue), [name, value, setFieldValue]);
  const removeItem = useCallback((index: number) => removeItemLocal(name, value, setFieldValue, index), [name, value, setFieldValue]);
  const moveItemDown = useCallback((index: number) => moveDownLocal(name, value, setFieldValue, index), [name, value, setFieldValue]);
  const moveItemUp = useCallback((index: number) => moveUpLocal(name, value, setFieldValue, index), [name, value, setFieldValue]);
  const moveItemDownDisabled = useCallback((index: number) => moveDownDisabledLocal(value, index), [name, value]);
  const moveItemUpDisabled = useCallback((index: number) => moveUpDisabledLocal(index), []);

  return {
    addItem,
    removeItem,
    moveItemDown,
    moveItemUp,
    moveItemDownDisabled,
    moveItemUpDisabled,
  };
}

export type FormikArrayModifierType = ReturnType<typeof useFormikArrayModifier>;

export default useFormikArrayModifier;
