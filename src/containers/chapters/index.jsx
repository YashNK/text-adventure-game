import { useNavigate } from "react-router-dom";
import { GameData } from "../../assets/constants/game";

export const Chapters = () => {
  const navigate = useNavigate();

  const handleChapterSelect = (chapter) => {
    localStorage.setItem(
      "GAME_DATA",
      JSON.stringify({
        chapterId: chapter.chapterId,
        levelId: chapter.levels[0].levelId,
      })
    );
    navigate("/level");
  };

  return (
    <div className="chapters_main_container h-full">
      <div className="pb-3 text-green-400">Chapters</div>
      <div className="chapters_container">
        {GameData[0].chapters.map((chapter) => (
          <div key={chapter.chapterId}>
            <button
              onClick={() => handleChapterSelect(chapter)}
              className="w-full text-start p-3 mb-3 rounded-lg bg-gray-800 cursor-pointer"
              key={chapter.chapterId}
            >
              <div className="text-green-500">{chapter.chapterTitle}</div>
              <div className="text-green-300">{chapter.chapterDescription}</div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
