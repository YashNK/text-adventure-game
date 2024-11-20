import React from "react";

export const Map = ({ map }) => {
  return (
    <div>
      <div className="text-xl font-semibold">Current Map</div>
      <div className="map-container">
        {map.length > 1 ? (
          map.map((sceneId, index) => (
            <span key={index}>
              [{sceneId}]
              {index < map.length - 1 && " => "}
            </span>
          ))
        ) : (
          <span>[ ]</span> // Display an empty map if only initial scene
        )}
      </div>
    </div>
  );
};
