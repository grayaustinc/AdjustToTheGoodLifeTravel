import React, { Reducer } from "react";

type Action = { type: "set"; message: string } | { type: "clear" };

const reducer: Reducer<string | null, Action> = (_, action) => {
  switch (action.type) {
    case "set":
      return action.message;
    default:
    case "clear":
      return null;
  }
};

export type ReducerType = [string | null, React.Dispatch<Action>];

export default reducer;
