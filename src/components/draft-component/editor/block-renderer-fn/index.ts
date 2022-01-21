import wrapper from "src/components/draft-component/shared/block-renderer-fn";

import ImageComponent from "./image-component";
import YoutubeComponent from "./youtube-component";
import PartComponent from "./part-component";

const blockRendererFn = wrapper(ImageComponent, YoutubeComponent, PartComponent);

export default blockRendererFn;
