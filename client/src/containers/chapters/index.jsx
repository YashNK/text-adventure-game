import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchApi } from "../../hooks/use-fetch-api";
import { Page } from "../../constants/routes";
import { apiRoutes } from "../../constants/api-routes";
import { createNewPath } from "../../utils";
import { ChapterSkeletonLoading } from "./chapters-skeleton-loading";
import "./chapters.scss";

export const Chapters = () => {
  const navigate = useNavigate();
  const { storyId } = useParams();
  const { fetchData, data: chapters, isLoading } = useFetchApi();

  useEffect(() => {
    fetchData(`${apiRoutes.CHAPTER}/story/${storyId}`, "GET");
  }, []);

  const handleChapterSelect = (chapterId) => {
    navigate(
      createNewPath(Page.LEVEL, {
        storyId: storyId,
        chapterId: chapterId,
      })
    );
  };

  return (
    <div>
      <div className="pb-3">Chapters:</div>
      {isLoading ? (
        <ChapterSkeletonLoading />
      ) : (
        chapters?.map((c) => (
          <div
            key={c.chapterId}
            onClick={() => {
              if (c.isActive) handleChapterSelect(c.chapterId);
            }}
            className={`chapters_container w-full p-5 mb-3 main_card_container cursor-pointer ${
              c.isActive ? "" : "disabled"
            }`}
          >
            <div className="">{c.chapterTitle}</div>
            <div className="">{c.chapterDescription}</div>
          </div>
        ))
      )}
    </div>
  );
};
