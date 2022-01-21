import React, { FunctionComponent } from "react";
import { ComposableMap, Geographies, Geography, Graticule, Marker } from "react-simple-maps";

import geography from "./geography.json";

import markerStyle from "./marker.module.scss";

import type { LocationDocumentData } from "libs/arangodb/collections/locations";

interface MapProps {
  locations: Pick<LocationDocumentData, "name" | "coordinates">[];
  onClick?: (index: number) => any;
}

const MapComponent: FunctionComponent<MapProps> = ({ locations: markers, onClick }) => {
  return (
    <ComposableMap projection="geoEqualEarth">
      <Graticule stroke="#DDD" />
      <Geographies geography={geography} stroke="#FFF" strokeWidth={0.5}>
        {({ geographies }) =>
          geographies.map((geo) => {
            return (
              <Geography
                key={geo.rsmKey}
                tabIndex={-1}
                geography={geo}
                fill="#EAEAEC"
                stroke="#D6D6DA"
                style={{
                  default: { outline: "none" },
                  hover: { outline: "none" },
                  pressed: { outline: "none" },
                }}
              />
            );
          })
        }
      </Geographies>
      {markers.map(({ name, coordinates }, i) => (
        <Marker key={name} coordinates={coordinates} onClick={() => onClick?.(i)}>
          <circle r={5} className={markerStyle.marker} />
        </Marker>
      ))}
    </ComposableMap>
  );
};

export default MapComponent;
