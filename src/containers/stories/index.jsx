import React from "react";
import "./stories.css";
import { useNavigate } from "react-router-dom";
import { story } from "../../assets/constants/userDetails";

export const Stories = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="text-green-400">{story.storyTitle}</div>
      <div className="story_description text-center mb-3 mt-2 p-2">
        {story.storyDescription}
      </div>
      <div>
        <button
          onClick={() => navigate("/chapters")}
          className="primary_btn bg-green-600"
        >
          Begin Your Journey
        </button>
      </div>
    </div>
  );
};
