import { Reducer, useCallback, useReducer } from "react";

type SubmitType<T> = ((values: T) => void) | undefined;

export type ModalAsset<T> = {
  show: boolean;
  data?: T | null;
  onSubmit: SubmitType<T>;
};

interface ShowAction<T> {
  type: "show";
  data?: T | null;
  onSubmit: SubmitType<T>;
}

interface HideAction {
  type: "hide";
}

export type ModalActions<T> = ShowAction<T> | HideAction;

function createModalHook<T>(initialState: ModalAsset<T>) {
  const reducer: Reducer<ModalAsset<T>, ModalActions<T>> = useCallback((state, action) => {
    switch (action.type) {
      case "show":
        return { show: true, data: action.data, onSubmit: action.onSubmit };
      case "hide":
        return { show: false, data: state.data, onSubmit: undefined };
      default:
        return state;
    }
  }, []);

  const hook = useReducer<Reducer<ModalAsset<T>, ModalActions<T>>>(reducer, initialState);

  return hook;
}

export default createModalHook;
