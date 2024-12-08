import { useNavigate } from "react-router-dom";
import { useFetchApi } from "../../hooks/use-fetch-api";

export const Chapters = () => {
  const { fetchData, loading } = useFetchApi();
  const navigate = useNavigate();

  const handleChapterSelect = (chapter) => {
    navigate("/level");
  };

  return (
    <div className="chapters_main_container h-full">
      <div className="pb-3 text-green-400">Chapters</div>
      <div className="chapters_container">
        <div>
          <button className="w-full text-start p-3 mb-3 rounded-lg bg-gray-800 cursor-pointer">
            <div className="text-green-500">title</div>
            <div className="text-green-300">description</div>
          </button>
        </div>
      </div>
    </div>
  );
};
