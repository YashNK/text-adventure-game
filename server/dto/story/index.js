export const GetAllStoriesResponse = (stories, userStories) => {
  return stories.map((story) => {
    const matchedUserStory = userStories
      ? userStories.find((userStory) => userStory.storyId === story.storyId)
      : null;
    return {
      storyId: story.storyId,
      storyTitle: story.storyTitle,
      storyDescription: story.storyDescription,
      storyImage: story.storyImage,
      userSelectedCharacterId: matchedUserStory
        ? matchedUserStory.characterId
        : 0,
      characterIds: story.characterIds,
      chapterIds: story.chapterIds,
    };
  });
};

export const GetOneStoryResponse = (story, chapters, characters) => {
  return {
    storyId: story.storyId,
    storyTitle: story.storyTitle,
    storyDescription: story.storyDescription,
    characters: characters.map((char) => ({
      characterId: char.characterId,
      name: char.name,
    })),
    chapters: chapters.map((chap) => ({
      chapterId: chap.chapterId,
      title: chap.title,
    })),
  };
};

export const CreateAndUpdateStoryResponse = (story) => {
  return {
    storyId: story.storyId,
    storyTitle: story.storyTitle,
    storyDescription: story.storyDescription,
    storyImage: story.storyImage,
    characterIds: story.characterIds,
    chapterIds: story.chapterIds,
  };
};
