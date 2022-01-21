import { Dispatch } from "react";
import createModalHook, { ModalAsset, ModalActions } from "libs/helper/create-modal-hook";

import type { YoutubeDataType } from "src/components/draft-component/shared/validation/youtube";

export type YoutubeModalAsset = ModalAsset<YoutubeDataType>;
export type YoutubeModalDispatch = Dispatch<ModalActions<YoutubeDataType>>;

const initialState: YoutubeModalAsset = {
  show: false,
  onSubmit: () => console.error('did not have "onSubmit" set for youtube-modal'),
};

export default () => createModalHook(initialState);
