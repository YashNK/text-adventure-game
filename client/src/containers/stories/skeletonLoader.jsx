import React from "react";
import "./skeletonLoader.css";

export const SkeletonLoader = () => (
  <div className="main_card_container story_card_container skeleton">
    <div className="w-full">
      <div className="story_card_title skeleton-title"></div>
      <div className="story_card_description skeleton-description"></div>
    </div>
    <div className="flex px-4">
      <div className="primary_btn skeleton-btn mr-3"></div>
      <div className="secondary_btn skeleton-btn"></div>
    </div>
  </div>
);
