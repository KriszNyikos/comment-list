import { CommentService } from './comment.service';
import { MockApiService } from '../mock-api/mock-api.service';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Comment } from '@shared';
import { firstValueFrom, of } from 'rxjs';

const FAKE_DATA = {
  comments: [
    { id: 'fake-id1', title: 'fake-title1', text: 'fake-text1', tags: ['tag1', 'tag2'] },
    { id: 'fake-id2', title: 'fake-title2', text: 'fake-text2', tags: ['tag1'] },
    { id: 'fake-id3', title: 'fake-title3', text: 'fake-text3', tags: ['tag3'] },
  ] as Comment[],
  get tags(): Comment['tags'] {
    const newTagList = this.comments.reduce((acc: string[], comment: Comment) => {
      return [...acc, ...comment.tags];
    }, []);

    return [...new Set(newTagList)];
  }
} as const;

describe('CommentService', () => {
  let serviceUnderTest: CommentService;
  let mockApi: MockApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CommentService,
        { provide: MockApiService, useValue: {} },
      ],
    });
  });

  beforeEach(() => {
    serviceUnderTest = TestBed.inject(CommentService);

    mockApi = TestBed.inject(MockApiService);
    mockApi.getComments = jasmine.createSpy('getComments').and.returnValue(of(FAKE_DATA.comments));
    mockApi.changeComments = jasmine.createSpy('changeComments').and.callFake((comments) => of(comments));
  });

  it('should create an instance of the service', () => {
    // Arrange
    // Act
    // Assert
    expect(serviceUnderTest).toBeTruthy();
  });

  describe('#initComments', () => {
    it('should initialize the comments state', async () => {
      // Arrange
      // Act
      await serviceUnderTest.initComments();
      const commentsState = await firstValueFrom(serviceUnderTest.getCommentLists());
      const tagsState = await firstValueFrom(serviceUnderTest.getAvailableTags());

      // Assert
      expect(mockApi.getComments).toHaveBeenCalledWith();
      expect(commentsState).toEqual(FAKE_DATA.comments);
      expect(tagsState).toEqual(FAKE_DATA.tags);
    });
  });

  describe('#getCommentLists', () => {
    it('should return comments', async () => {
      // Arrange
      // Act
      await serviceUnderTest.initComments();
      const comments = await firstValueFrom(serviceUnderTest.getCommentLists());

      // Assert
      expect(comments).toEqual(FAKE_DATA.comments);
    });
  });

  describe('#getAvailableTags', () => {
    it('should return tags', async () => {
      // Arrange
      // Act
      await serviceUnderTest.initComments();
      const tags = await firstValueFrom(serviceUnderTest.getAvailableTags());

      // Assert
      expect(tags).toEqual(FAKE_DATA.tags);
    });
  });

  describe('#getSelectedTags', () => {
    it('should return selected tags', async () => {
      // Arrange
      const selectedTag = FAKE_DATA.tags[0];

      // Act
      serviceUnderTest.toggleSelectedTag(selectedTag);

      const tags = await firstValueFrom(serviceUnderTest.getSelectedTags());

      // Assert
      expect(tags).toEqual([selectedTag]);
    });
  });

  describe('#toggleSelectedTag', () => {
    it('should remove the tag if it already exists', async () => {
      // Arrange
      const selectedTag = FAKE_DATA.tags[0];

      // Act
      /* select */
      serviceUnderTest.toggleSelectedTag(selectedTag);
      /* unselect */
      serviceUnderTest.toggleSelectedTag(selectedTag);

      const tags = await firstValueFrom(serviceUnderTest.getSelectedTags());

      // Assert
      expect(tags).toEqual([]);
    });

    it('should add the tag if it does not exist', async () => {
      // Arrange
      const selectedTag = FAKE_DATA.tags[0];

      // Act
      serviceUnderTest.toggleSelectedTag(selectedTag);

      const tags = await firstValueFrom(serviceUnderTest.getSelectedTags());

      // Assert
      expect(tags).toEqual([selectedTag]);
    });
  });

  describe('#removeComment', () => {
    it('should remove the comment from the list', fakeAsync(async () => {
      // Arrange
      const commentId = FAKE_DATA.comments[0].id;

      // Act
      await serviceUnderTest.initComments();
      serviceUnderTest.removeComment(commentId);

      tick(100);

      const comments = await firstValueFrom(serviceUnderTest.getCommentLists());

      // Assert
      expect(comments).toEqual(FAKE_DATA.comments.filter(({ id }) => id !== commentId));
    }));
  });

  describe('#updateComment', () => {
    it('should update the comment', fakeAsync(async () => {
      // Arrange
      const comment: Comment = {
        ...FAKE_DATA.comments[0],
        text: 'updated-fake-text',
        title: 'updated-fake-title',
      };

      // Act
      await serviceUnderTest.initComments();
      serviceUnderTest.updateComment(comment);

      tick(100);

      const comments = await firstValueFrom(serviceUnderTest.getCommentLists());

      // Assert
      expect(comments).toEqual([comment, ...FAKE_DATA.comments.slice(1)]);
    }));
  });

  describe('#addComment', () => {
    it('should add a new comment', fakeAsync(async () => {
      // Arrange
      const comment: Partial<Comment> = {
        text: 'updated-fake-text',
        title: 'updated-fake-title',
        tags: [],
      };

      // Act
      await serviceUnderTest.initComments();
      serviceUnderTest.addComment(comment);

      tick(100);

      const comments = await firstValueFrom(serviceUnderTest.getCommentLists());

      // Assert
      expect(comments).toEqual(jasmine.arrayContaining([
        ...FAKE_DATA.comments,
        { ...comment, id: jasmine.any(String) },
      ]));
    }));
  });
});
