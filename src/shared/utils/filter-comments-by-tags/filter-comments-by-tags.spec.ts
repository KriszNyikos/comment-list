import { filterCommentsByTag } from './filter-comments-by-tag';
import { Comment } from '../../interfaces';

const FAKE_DATA = {
  comments: [
    { id: 'fake-id1', title: 'fake-title1', text: 'fake-text1', tags: ['tag1', 'tag2'] },
    { id: 'fake-id2', title: 'fake-title2', text: 'fake-text2', tags: ['tag1'] },
    { id: 'fake-id3', title: 'fake-title3', text: 'fake-text3', tags: ['tag3'] },
  ] as Comment[],
} as const;

describe('#filterCommentsByTag', () => {
  it('should return all comments when selectedTags is null', () => {
    // Arrange
    const selectedTags = null;

    // Act
    const filteredComments = filterCommentsByTag(FAKE_DATA.comments, selectedTags);

    // Assert
    expect(filteredComments).toEqual(FAKE_DATA.comments);
  });

  it('should return all comments when selectedTags is an empty array', () => {
    // Arrange
    const selectedTags: string[] = [];

    // Act
    const filteredComments = filterCommentsByTag(FAKE_DATA.comments, selectedTags);

    // Assert
    expect(filteredComments).toEqual(FAKE_DATA.comments);
  });

  it('should filter comments based on selected tags', () => {
    // Arrange
    const selectedTags = ['tag1'];
    const expectedFilteredComments: Comment[] = [
      { id: 'fake-id1', title: 'fake-title1', text: 'fake-text1', tags: ['tag1', 'tag2'] },
      { id: 'fake-id2', title: 'fake-title2', text: 'fake-text2', tags: ['tag1'] },
    ];

    // Act
    const filteredComments = filterCommentsByTag(FAKE_DATA.comments, selectedTags);

    // Assert
    expect(filteredComments).toEqual(expectedFilteredComments);
  });

  it('should handle multiple selected tags', () => {
    // Arrange
    const selectedTags = ['tag1', 'tag3'];

    // Act
    const filteredComments = filterCommentsByTag(FAKE_DATA.comments, selectedTags);

    // Assert
    expect(filteredComments).toEqual(FAKE_DATA.comments);
  });

  it('should handle non-matching tags', () => {
    // Arrange
    const selectedTags = ['nonexistent-tag'];

    // Act
    const filteredComments = filterCommentsByTag(FAKE_DATA.comments, selectedTags);

    // Assert
    expect(filteredComments).toEqual([]);
  });
});
