import React from "react";
import "./character-skeleton-loader.scss";

export const CharactersSkeletonLoader = () => {
  return (
    <div className="character_card_container skeleton_character_card_container">
      <div className="main_card_container character_card">
        <div className="card_image_container">
          <div className="skeleton_character_card_image" src="" />
        </div>
        <div className="mb-2 skeleton_character_name"></div>
        <div className="character_description mb-3 skeleton_character_description"></div>
        <div className="skeleton_character_footer"></div>
      </div>
      <div className="main_card_container character_card">
        <div className="card_image_container">
          <div className="skeleton_character_card_image" src="" />
        </div>
        <div className="mb-2 skeleton_character_name"></div>
        <div className="character_description mb-3 skeleton_character_description"></div>
        <div className="skeleton_character_footer"></div>
      </div>
    </div>
  );
};
