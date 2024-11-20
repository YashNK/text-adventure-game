import React from "react";
import { useNavigate } from "react-router-dom";
import { GameData } from "../../assets/constants/game";
import "./stories.css";

export const Stories = () => {
  const navigate = useNavigate();
  const story = GameData[0];

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="text-green-400">{story.storyTitle}</div>
      <div className="story_description text-center mb-3 px-2">
        {story.storyDescription.split("\n").map((line, index) => (
          <p className="pt-3" key={index}>
            {line}
          </p>
        ))}
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
