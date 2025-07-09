export const CreateAndUpdateResponse = (response) => {
  return {
    responseId: response.responseId,
    responseOption: response.responseOption,
    nextSceneId: response.nextSceneId,
  };
};
