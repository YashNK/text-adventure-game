export const GetChaptersResponse = (chapters) => {
  return chapters.map((chapter) => ({
    chapterId: chapter.chapterId,
    chapterTitle: chapter.chapterTitle,
    chapterDescription: chapter.chapterDescription,
    isCompleted: chapter.isCompleted,
    isActive: chapter.isActive,
    levelIds: chapter.levelIds,
    chapterImage: chapter.chapterImage,
  }));
};

export const CreateAndUpdateChapterResponse = (chapter) => {
  return {
    chapterId: chapter.chapterId,
    chapterTitle: chapter.chapterTitle,
    chapterDescription: chapter.chapterDescription,
    isCompleted: chapter.isCompleted,
    isActive: chapter.isActive,
    levelIds: chapter.levelIds,
    chapterImage: chapter.chapterImage,
  };
};
