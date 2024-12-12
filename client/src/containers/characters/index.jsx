import React, { useEffect } from "react";
import { useFetchApi } from "../../hooks/use-fetch-api";
import { apiRoutes } from "../../constants/api-routes";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { showCharacter } from "../../utils/show-image";
import { createNewPath } from "../../utils";
import { Page } from "../../constants/routes";
import { CharactersSkeletonLoader } from "./characters-skeleton-loading";
import "./characters.scss";

export const Characters = () => {
  const navigate = useNavigate();
  const { storyId } = useParams();
  const { currentUser } = useOutletContext();
  const { fetchData, data, isLoading } = useFetchApi();
  const { fetchData: setUserCharacter } = useFetchApi();

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
    <div className="character_main_container">
      <div className="pb-2">
        <div>Choose Your Character</div>
        <div>
          Each character has its own unique story, so choose wisely, your
          character choice will decide your path moving forward. You can not
          switch characters later in the game.
        </div>
      </div>
      <div className="flex_1_1_10 overflow-auto">
        {isLoading ? (
          <CharactersSkeletonLoader />
        ) : (
          <div className="character_card_container">
            {data &&
              data.map((char) => (
                <div
                  onClick={() => handleCharacterSelect(char.characterId)}
                  className="main_card_container character_card"
                  key={char.characterId}
                >
                  <div className="card_image_container">
                    <img
                      className="card_image"
                      src={showCharacter(char.avatar)}
                    />
                  </div>
                  <div className="mb-2 text-center font_30">{char.name}</div>
                  <div className="mb-2 text-center flex_1_1_10">
                    {char.description}
                  </div>
                  <div className="">
                    <span className="">Health:</span> {char.health}
                  </div>
                  <div className="">
                    <span className="">Attack Power:</span> {char.attackPower}
                  </div>
                  <div className="mb-2">
                    <span className="">Special Ability:</span>{" "}
                    {char.specialAbility}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};
