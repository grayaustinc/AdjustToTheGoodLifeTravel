import React, { Component, FunctionComponent } from "react";
import { DebounceSettings } from "lodash";
import debounce from "lodash/debounce";

function debounceRender<P>(TargetComponent: FunctionComponent<P>, wait?: number, settings?: DebounceSettings) {
  class DebouncedContainer extends Component<P> {
    private updateDebounced = debounce(this.forceUpdate, wait, settings);

    shouldComponentUpdate() {
      this.updateDebounced();
      return false;
    }

    componentWillUnmount() {
      this.updateDebounced.cancel();
    }

    render() {
      return <TargetComponent {...this.props} />;
    }
  }

  return DebouncedContainer;
}

export default debounceRender;
