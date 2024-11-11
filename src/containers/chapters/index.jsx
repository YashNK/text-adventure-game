import { useNavigate } from "react-router-dom";
import { GameData } from "../../assets/constants/game";
import { setLocalStorageValue } from "../../assets/constants/userDetails";

export const Chapters = () => {
  const navigate = useNavigate();

  const handleChapterSelect = (id) => {
    setLocalStorageValue("CHAPTER", id);
    navigate("/level");
  };

  return (
    <div className="chapters_main_container h-full">
      <div className="pb-3 text-green-400">Chapters</div>
      <div className="chapters_container">
        {GameData[0].chapters.map((chapter) => (
          <div>
            <button
              disabled={!chapter.isActive}
              onClick={() => handleChapterSelect(chapter.chapterId)}
              className={`w-full text-start p-3 mb-3 rounded-lg ${
                !chapter.isActive
                  ? "bg-gray-900 cursor-not-allowed"
                  : "bg-gray-800 cursor-pointer"
              }`}
              key={chapter.chapterId}
            >
              <div
                className={`${
                  !chapter.isActive ? "text-green-900" : "text-green-500"
                }`}
              >
                {chapter.chapterTitle}
              </div>
              <div
                className={`${
                  !chapter.isActive ? "text-green-900" : "text-green-300"
                }`}
              >
                {chapter.chapterDescription}
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
