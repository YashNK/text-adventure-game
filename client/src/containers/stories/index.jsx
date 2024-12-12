import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useFetchApi } from "../../hooks/use-fetch-api";
import { apiRoutes } from "../../constants/api-routes";
import { StoriesSkeletonLoader } from "./stories-skeleton-loader";
import { Page } from "../../constants/routes";
import { createNewPath } from "../../utils";
import { showStory } from "../../utils/show-image";
import I18 from "../../plugins/i18";
import "./stories.scss";

export const Stories = () => {
  const navigate = useNavigate();
  const { currentUser } = useOutletContext();
  const { fetchData, isLoading, data: story } = useFetchApi();
  const [viewStoryDescription, setViewStoryDescription] = useState({
    show: false,
    storyId: 0,
  });

  useEffect(() => {
    fetchData(apiRoutes.STORY, "GET");
  }, []);

  const handleBeginJourney = (storyId) => {
    if (currentUser.CharacterId) {
      navigate(
        createNewPath(Page.CHAPTERS, {
          storyId: storyId,
        })
      );
    } else {
      navigate(
        createNewPath(Page.CHARACTERS, {
          storyId: storyId,
        })
      );
    }
  };

  return (
    <div className="story_container">
      <div className="pb-4">
        <div>
          <I18 tkey="WELCOME_TO_ECHO_VERSE" />!
        </div>
        <I18 tkey="STORIES_DESC" />
      </div>
      <div className="flex_1_1_10 overflow-auto">
        {isLoading ? (
          <StoriesSkeletonLoader />
        ) : story && story.length > 0 ? (
          story.map((s) => (
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
                  {s.storyDescription}
                </div>
              </div>
              <div className="story_btn_container">
                <button
                  onClick={() => handleBeginJourney(s.storyId)}
                  className="primary_btn mr-3"
                >
                  {currentUser?.CharacterId ? (
                    <I18 tkey="CONTINUE_JOURNEY" />
                  ) : (
                    <I18 tkey="BEGIN_YOUR_JOURNEY" />
                  )}
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
                  <I18 tkey="VIEW_STORY_DESCRIPTION" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center">No data</div>
        )}
      </div>
    </div>
  );
};
