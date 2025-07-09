import { Characters, Stories } from "../../constants";
import SYLVARA_EMBERGLINT from "../../assets/images/SYLVARA_EMBERGLINT.webp";
import AELORIA_NIGHTSHADE from "../../assets/images/AELORIA_NIGHTSHADE.webp";
import STORY_ONE from "../../assets/images/STORY_ONE.webp";

export const showCharacter = (avatar) => {
  if (avatar === Characters.SYLVARA_EMBERGLINT) {
    return SYLVARA_EMBERGLINT;
  }
  if (avatar === Characters.AELORIA_NIGHTSHADE) {
    return AELORIA_NIGHTSHADE;
  }
  if (avatar === Characters.KAELEN_BLACKTHORN) {
    return SYLVARA_EMBERGLINT;
  }
  if (avatar === Characters.VEYRA_DARKMOOR) {
    return AELORIA_NIGHTSHADE;
  }
};

export const showStory = (story) => {
  if (story === Stories.STORY_ONE) {
    return STORY_ONE;
  }
};
