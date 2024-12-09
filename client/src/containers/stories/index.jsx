import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useFetchApi } from "../../hooks/use-fetch-api";
import { apiRoutes } from "../../constants/api-routes";
import { SkeletonLoader } from "./skeletonLoader";
import { Page } from "../../constants/routes";
import { createNewPath } from "../../utils";
import "./stories.scss";

export const Stories = () => {
  const navigate = useNavigate();
  const { currentUser } = useOutletContext();
  const { fetchData, isLoading, isSuccess, data } = useFetchApi();
  const [story, setStory] = useState([
    {
      storyId: 0,
      storyTitle: "",
      storyDescription: "",
    },
  ]);
  const [viewStoryDescription, setViewStoryDescription] = useState({
    show: false,
    storyId: 0,
  });

  useEffect(() => {
    fetchData(apiRoutes.STORY, "GET");
  }, []);

  useEffect(() => {
    if (data && isSuccess) {
      setStory(data);
    }
  }, [data, isSuccess]);

  const handleBeginJourney = (storyId) => {
    // if (currentUser.CharacterId) {
    //   navigate(
    //     createNewPath(Page.CHAPTERS, {
    //       storyId: storyId,
    //     })
    //   );
    // } else {
    //   navigate(
    //     createNewPath(Page.CHARACTERS, {
    //       storyId: storyId,
    //     })
    //   );
    // }
    navigate(
      createNewPath(Page.CHARACTERS, {
        storyId: storyId,
      })
    );
  };

  return (
    <div className="story_container">
      {isLoading ? (
        <SkeletonLoader />
      ) : story.length > 0 ? (
        story.map((s) => (
          <div
            key={s.storyId}
            className="main_card_container story_card_container mb-3"
          >
            <div className="story_card_content">
              <div className="story_card_title">{s.storyTitle}</div>
              <div
                className={`${
                  viewStoryDescription.show &&
                  viewStoryDescription.storyId === s.storyId
                    ? "show_full_description"
                    : "truncate"
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
                Begin Your Journey
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
      ) : (
        <div className="flex items-center justify-center h-full">No data</div>
      )}
    </div>
  );
};
