import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useFetchApi } from "../../hooks/use-fetch-api";
import { apiRoutes } from "../../constants/api-routes";
import { StoriesSkeletonLoader } from "./stories-skeleton-loader";
import { Page } from "../../constants/routes";
import { createNewPath } from "../../utils";
import { showStory } from "../../utils/show-data";
import "./stories.scss";

export const Stories = () => {
  const navigate = useNavigate();
  const { currentUser } = useOutletContext();
  const { fetchData, isLoading, data: story } = useFetchApi();
  const { fetchData: createUserStory } = useFetchApi();
  const [viewStoryDescription, setViewStoryDescription] = useState({
    show: false,
    storyId: 0,
  });

  useEffect(() => {
    if (currentUser) {
      fetchData(`${apiRoutes.STORY}/stories/${currentUser.userId}`, "GET");
    }
  }, [currentUser]);

  const handleBeginJourney = (storyId, storyIndex) => {
    if (story[storyIndex].userSelectedCharacterId > 0) {
      navigate(
        createNewPath(Page.CHAPTERS, {
          storyId: storyId,
        })
      );
    } else {
      createUserStory(
        `${apiRoutes.USER_STORY}/user/${currentUser.userId}`,
        "POST",
        {
          storyId: storyId,
        }
      );
      navigate(
        createNewPath(Page.CHARACTERS, {
          storyId: storyId,
        })
      );
    }
  };

  return (
    <div className="story_container">
      <div className="pb-4 px-5">
        <div>Welcome to EchoVerse!</div>
        This is where the magic begins. Choose your favorite story from our
        collection, explore its description, and embark on your journey whenever
        you're ready.
      </div>
      <div className="flex_1_1_10 overflow-auto px-5">
        {isLoading ? (
          <StoriesSkeletonLoader />
        ) : story && story.length === 0 ? (
          <div className="flex items-center justify-center h-full">No data</div>
        ) : (
          story &&
          story.map((s, storyIndex) => (
            <div
              key={s.storyId}
              className="main_card_container story_card_container mb-3"
            >
              <div className="story_image_container">
                <img className="story_image" src={showStory(s.storyImage)} />
              </div>
              <div className="story_card_content">
                <span className="story_card_title font_20">{s.storyTitle}</span>
                <div
                  className={`${
                    viewStoryDescription.show &&
                    viewStoryDescription.storyId === s.storyId
                      ? "show_full_description"
                      : ""
                  } story_card_description`}
                >
                  <span className="text-ellipsis">{s.storyDescription}</span>
                </div>
              </div>
              <div className="story_btn_container">
                <button
                  onClick={() => handleBeginJourney(s.storyId, storyIndex)}
                  className="primary_btn mr-3"
                >
                  {s.userSelectedCharacterId <= 0
                    ? "Begin Your Journey"
                    : "Continue Journey"}
                </button>
                <button
                  onClick={() =>
                    setViewStoryDescription(() => ({
                      storyId: s.storyId,
                      show: !viewStoryDescription.show,
                    }))
                  }
                  className="secondary_btn"
                >
                  View Story Description
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
