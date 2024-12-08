import React from "react";
import "./skeletonLoader.scss";

export const SkeletonLoader = () => (
  <>
    <div className="pb-5">
      <div className="main_card_container story_card_container skeleton_container">
        <div className="w-full">
          <div className="story_card_title skeleton_title"></div>
          <div className="story_card_description skeleton_description"></div>
        </div>
        <div className="skeleton_btn_container">
          <div className="primary_btn skeleton_btn mr-3"></div>
          <div className="secondary_btn skeleton_btn"></div>
        </div>
      </div>
    </div>
  </>
);
