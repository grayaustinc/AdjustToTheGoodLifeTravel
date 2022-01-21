import React, { createContext, FunctionComponent, useMemo } from "react";

import useImageHook, { ImageModalAsset, ImageModalDispatch } from "src/modals/image/hook";
import ImageModalComponent from "src/modals/image/modal";

import useYoutubeHook, { YoutubeModalAsset, YoutubeModalDispatch } from "./youtube/hook";
import YoutubeModalComponent from "./youtube/modal";

import useLinkHook, { LinkModalAsset, LinkModalDispatch } from "./link/hook";
import LinkModalComponent from "./link/modal";
import { ModalAsset } from "libs/helper/create-modal-hook";

interface ContextType {
  modalIsShowing: boolean;
  youtubeAsset: YoutubeModalAsset;
  imageAsset: ImageModalAsset;
  linkAsset: LinkModalAsset;
  youtubeDispatch: YoutubeModalDispatch;
  imageDispatch: ImageModalDispatch;
  linkDispatch: LinkModalDispatch;
}

export const modalContext = createContext<ContextType>({} as any);

const ModalProvider = modalContext.Provider;

function checkShowing(assets: ModalAsset<any>[]) {
  return useMemo(() => assets.some((asset) => asset.show), [assets]);
}

const ModalProviderComponent: FunctionComponent = ({ children }) => {
  const [youtubeAsset, youtubeDispatch] = useYoutubeHook();
  const [imageAsset, imageDispatch] = useImageHook();
  const [linkAsset, linkDispatch] = useLinkHook();

  const modalIsShowing = checkShowing([youtubeAsset, imageAsset, linkAsset]);

  return (
    <ModalProvider value={{ modalIsShowing, youtubeAsset, imageAsset, linkAsset, youtubeDispatch, imageDispatch, linkDispatch }}>
      <YoutubeModalComponent asset={youtubeAsset} dispatch={youtubeDispatch} />
      <ImageModalComponent asset={imageAsset} dispatch={imageDispatch} />
      <LinkModalComponent asset={linkAsset} dispatch={linkDispatch} />
      <>{children}</>
    </ModalProvider>
  );
};

export default ModalProviderComponent;
