import React, { createContext, FunctionComponent } from "react";

import type { ImageModalAsset, ImageModalDispatch } from "../hook";
import ImageModalComponent from "../modal";

interface ContextType {
  imageAsset: ImageModalAsset;
  imageDispatch: ImageModalDispatch;
}

export const context = createContext<ContextType>({} as any);

const ModalImageProvider = context.Provider;

const ModalImageProviderComponent: FunctionComponent<ContextType> = ({ imageAsset, imageDispatch, children }) => {
  return (
    <ModalImageProvider value={{ imageAsset, imageDispatch }}>
      <ImageModalComponent asset={imageAsset} dispatch={imageDispatch} />
      <>{children}</>
    </ModalImageProvider>
  );
};

export default ModalImageProviderComponent;
