import React from "react";
import "./chapters-skeleton-loading.scss";

export const ChapterSkeletonLoading = () => {
  return (
    <div className="chapters_container chapters_skeleton_container">
      <div className="w-full p-5 mb-3 main_card_container chapters_skeleton_card cursor-pointer">
        <div className="chapters_skeleton_title"></div>
        <div className="chapters_skeleton_description"></div>
      </div>
      <div className="w-full p-5 mb-3 main_card_container chapters_skeleton_card cursor-pointer">
        <div className="chapters_skeleton_title"></div>
        <div className="chapters_skeleton_description"></div>
      </div>
    </div>
  );
};
