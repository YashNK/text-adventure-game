import { Characters } from "../../constants";
import SYLVARA_EMBERGLINT from "../../assets/images/SYLVARA_EMBERGLINT.webp";
import AELORIA_NIGHTSHADE from "../../assets/images/AELORIA_NIGHTSHADE.webp";

export const showCharacter = (avatar) => {
  if (avatar === Characters.SYLVARA_EMBERGLINT) {
    return SYLVARA_EMBERGLINT;
  }
  if (avatar === Characters.AELORIA_NIGHTSHADE) {
    return AELORIA_NIGHTSHADE;
  }
};
