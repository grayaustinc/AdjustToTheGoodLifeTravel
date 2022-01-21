//node_modules
import { Dispatch } from "react";

//libs
import createModalHook, { ModalAsset, ModalActions } from "libs/helper/create-modal-hook";

import type { LinkDataType } from "src/components/draft-component/shared/validation/link";

export type LinkModalAsset = ModalAsset<LinkDataType>;
export type LinkModalDispatch = Dispatch<ModalActions<LinkDataType>>;

const initialState: LinkModalAsset = {
  show: false,
  onSubmit: () => console.error('did not have "onSubmit" set for link-modal'),
};

export default () => createModalHook(initialState);
