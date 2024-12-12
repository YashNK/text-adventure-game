import React from "react";

export const CharactersSkeletonLoader = () => {
  return (
    <div className="character_main_container">
      <div className="pb-2">
        <div></div>
        <div></div>
      </div>
      <div className="flex_1_1_10 overflow-auto">
        <div className="character_card_container">
          <div className="main_card_container character_card">
            <div className="card_image_container"></div>
            <div className="mb-2 text-center font_30"></div>
            <div className="mb-2 text-center flex_1_1_10"></div>
            <div className=""></div>
            <div className=""></div>
            <div className="mb-2"></div>
          </div>
        </div>
        <div className="character_card_container">
          <div className="main_card_container character_card">
            <div className="card_image_container"></div>
            <div className="mb-2 text-center font_30"></div>
            <div className="mb-2 text-center flex_1_1_10"></div>
            <div className=""></div>
            <div className=""></div>
            <div className="mb-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
