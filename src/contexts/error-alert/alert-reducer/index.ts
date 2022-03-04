import React, { Reducer } from "react";

type State = string | null | undefined;

type Action = { type: "set"; message?: string } | { type: "clear" };

const reducer: Reducer<State, Action> = (_, action) => {
  switch (action.type) {
    case "set":
      return action.message;
    default:
    case "clear":
      return null;
  }
};

export type ReducerType = [State, React.Dispatch<Action>];

export default reducer;
