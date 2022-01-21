import { Dispatch } from "react";
import createModalHook, { ModalAsset, ModalActions } from "libs/helper/create-modal-hook";

import type { ImageDataType } from "src/modals/image/validation";

export type ImageModalAsset = ModalAsset<ImageDataType>;
export type ImageModalDispatch = Dispatch<ModalActions<ImageDataType>>;

const initialState: ImageModalAsset = {
  show: false,
  onSubmit: () => console.error('did not have "onSubmit" set for the image modal'),
};

export default () => createModalHook(initialState);
