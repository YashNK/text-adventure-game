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
    <div className="flex_1_1_10 flex flex-col">
      <div className="pb-3 px-5">Chapters:</div>
      <div className="chapters_card_container px-5">
        {isLoading ? (
          <ChapterSkeletonLoading />
        ) : chapters && chapters.length > 0 ? (
          chapters?.map((c) => (
            <div
              key={c.chapterId}
              onClick={() => {
                if (c.isActive) handleChapterSelect(c.chapterId);
              }}
              className={`chapters_card p-5 mb-3 main_card_container ${
                c.isActive ? "" : "disabled"
              }`}
            >
              <div className="">{c.chapterTitle}</div>
              <div className="">{c.chapterDescription}</div>
            </div>
          ))
        ) : (
          <div className="h-full flex items-center justify-center">No Data</div>
        )}
      </div>
    </div>
  );
};
