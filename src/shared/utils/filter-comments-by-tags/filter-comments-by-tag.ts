import { Comment } from '../../interfaces';

export function filterCommentsByTag(
  comments: Comment[],
  selectedTags: string[] | null
): Comment[] {
  if (!selectedTags || !selectedTags?.length) {
    return comments;
  }

  return comments.filter((comment: Comment) => {
    return comment.tags.some((tag: string) => {
      return selectedTags.includes(tag);
    });
  });
}
