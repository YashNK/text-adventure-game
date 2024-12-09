import { useEffect } from "react";
import { useFetchApi } from "../../hooks/use-fetch-api";
import { apiRoutes } from "../../constants/api-routes";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { showCharacter } from "../../utils/show-character";
import { createNewPath } from "../../utils";
import { Page } from "../../constants/routes";
import "./characters.scss";

export const Characters = () => {
  const navigate = useNavigate();
  const { storyId } = useParams();
  const { currentUser } = useOutletContext();
  const { fetchData, data } = useFetchApi();
  const { fetchData: setUserCharacter, data: characterData } = useFetchApi();

  useEffect(() => {
    fetchData(`${apiRoutes.CHARACTERS}/${storyId}`, "GET");
  }, []);

  const handleCharacterSelect = (id) => {
    const characterId = parseInt(id);
    if (currentUser) {
      setUserCharacter(
        `${apiRoutes.SET_USER_CHARACTER}/${currentUser.userId}`,
        "PUT",
        {
          characterId,
        }
      );
      navigate(
        createNewPath(Page.CHAPTERS, {
          storyId: storyId,
        })
      );
    }
  };

  return (
    <div className="character_card_container">
      {data &&
        data.map((char) => (
          <div
            onClick={() => handleCharacterSelect(char.characterId)}
            className="main_card_container character_card"
            key={char.characterId}
          >
            <div className="card_image_container">
              <img className="card_image" src={showCharacter(char.avatar)} />
            </div>
            <div className="mb-2 font_30">{char.name}</div>
            <div className="mb-2 text-justify flex_1_1_10">
              {char.description}
            </div>
            <div className="">
              <span className="">Health:</span> {char.health}
            </div>
            <div className="">
              <span className="">Attack Power:</span> {char.attackPower}
            </div>
            <div className="mb-2">
              <span className="">Special Ability:</span> {char.specialAbility}
            </div>
          </div>
        ))}
    </div>
  );
};
