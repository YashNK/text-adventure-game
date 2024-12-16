export const CreateChapterResponse = (chapter) => {
  return {
    chapterId: chapter.chapterId,
    chapterTitle: chapter.chapterTitle,
    chapterDescription: chapter.chapterDescription,
    isCompleted: chapter.isCompleted,
    isActive: chapter.isActive,
    levels: chapter.levels,
  };
};
