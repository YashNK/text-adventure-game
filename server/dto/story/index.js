export const GetAllStoriesResponse = (stories, userStories) => {
  return stories.map((story, storyIndex) => {
    const filteredUserStories = userStories.filter(
      (userStory) => userStory.storyId === story.storyId
    );
    return {
      storyId: story.storyId,
      storyTitle: story.storyTitle,
      storyDescription: story.storyDescription,
      storyImage: story.storyImage,
      characterId: filteredUserStories[storyIndex].characterId,
      itemIds: filteredUserStories[storyIndex].itemIds,
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

export const UpdateStoryResponse = (updatedStory) => {
  return {
    storyId: updatedStory.storyId,
    storyTitle: updatedStory.storyTitle,
    storyDescription: updatedStory.storyDescription,
    characters: updatedStory.characters,
    chapters: updatedStory.chapters,
  };
};

export const CreateStoryResponse = (story) => {
  return {
    storyId: story.storyId,
    storyTitle: story.storyTitle,
    storyDescription: story.storyDescription,
    storyImage: story.storyImage,
  };
};
