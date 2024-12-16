import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchApi } from "../../hooks/use-fetch-api";
import { Page } from "../../constants/routes";
import { apiRoutes } from "../../constants/api-routes";
import { createNewPath } from "../../utils";

export const Chapters = () => {
  const navigate = useNavigate();
  const { storyId } = useParams();
  const { fetchData, data, loading } = useFetchApi();

  useEffect(() => {
    fetchData(`${apiRoutes.CHAPTER}/story/${storyId}`, "GET");
  }, []);

  const handleChapterSelect = (chapterId) => {
    navigate(
      createNewPath(Page.LEVEL, {
        chapterId: chapterId,
      })
    );
  };

  return (
    <div className="">
      <div className="pb-3">Chapters:</div>
      {data?.map((c) => (
        <div key={c.chapterId} className="chapters_container">
          <div
            onClick={() => handleChapterSelect(c.chapterId)}
            className="w-full p-5 mb-3 main_card_container cursor-pointer"
          >
            <div className="">{c.chapterTitle}</div>
            <div className="">{c.chapterDescription}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
