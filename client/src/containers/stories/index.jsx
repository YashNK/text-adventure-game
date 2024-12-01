import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchApi } from "../../hooks/use-fetch-api";
import { apiRoutes } from "../../constants/api-routes";
import { SkeletonLoader } from "./skeletonLoader";
import "./stories.css";
import { toast } from "react-toastify";

export const Stories = () => {
  const navigate = useNavigate();
  const { fetchData, loading } = useFetchApi();
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
    try {
      getData();
    } catch (err) {
      toast.error(err.message);
    }
  }, []);

  const getData = async () => {
    try {
      const response = await fetchData(`${apiRoutes.STORY}/stories`, "GET");
      if (response.isSuccess) {
        setStory(response.data);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="story_container">
      {loading ? (
        <SkeletonLoader />
      ) : (
        story.map((s) => (
          <>
            <div className="main_card_container story_card_container">
              <div>
                <div className="story_card_title">{s.storyTitle}</div>
                <div
                  className={`${
                    viewStoryDescription.show &&
                    viewStoryDescription.storyId === s.storyId
                      ? "show_full_description"
                      : "hide_story_description"
                  } story_card_description`}
                >
                  {s.storyDescription}
                </div>
              </div>
              <div className="flex px-4">
                <button
                  onClick={() => navigate("/chapters")}
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
          </>
        ))
      )}
    </div>
  );
};
