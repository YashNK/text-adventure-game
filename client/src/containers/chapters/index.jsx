import { useNavigate } from "react-router-dom";
import { useFetchApi } from "../../hooks/use-fetch-api";
import { Page } from "../../constants/routes";

export const Chapters = () => {
  const { fetchData, loading } = useFetchApi();
  const navigate = useNavigate();

  const handleChapterSelect = (chapter) => {
    navigate(Page.LEVEL);
  };

  return (
    <div className="">
      <div className="pb-3">Chapters:</div>
      <div className="chapters_container">
        <div
          onClick={() => handleChapterSelect()}
          className="w-full p-5 mb-3 main_card_container cursor-pointer"
        >
          <div className="">title</div>
          <div className="">description</div>
        </div>
      </div>
    </div>
  );
};
