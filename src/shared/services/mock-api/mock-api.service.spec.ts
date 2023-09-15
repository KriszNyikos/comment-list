import { Comment, LocaleStorageService, LocalStorageKey, MockApiService } from '@shared';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';

const FAKE_DATA = {
  comments: [
    { id: 'fake-id1', title: 'fake-title1', text: 'fake-text1', tags: ['tag1', 'tag2'] },
    { id: 'fake-id2', title: 'fake-title2', text: 'fake-text2', tags: ['tag1'] },
    { id: 'fake-id3', title: 'fake-title3', text: 'fake-text3', tags: ['tag3'] },
  ] as Comment[],
} as const;

describe('MockApiService', () => {
  let serviceUnderTest: MockApiService;
  let localeStorageService: LocaleStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockApiService,
        { provide: LocaleStorageService, useValue: {} },
      ],
    });
  });

  beforeEach(() => {
    serviceUnderTest = TestBed.inject(MockApiService);

    localeStorageService = TestBed.inject(LocaleStorageService);
    localeStorageService.getValue = jasmine.createSpy('getValue').and.returnValue(FAKE_DATA.comments)
    localeStorageService.setValue = jasmine.createSpy('setValue').and.callThrough();
  });

  it('should create an instance of the service', () => {
    // Arrange
    // Act
    // Assert
    expect(serviceUnderTest).toBeTruthy();
  });

  describe('#getComments', () => {
    it('should return comments from the api', async () => {
      // Arrange
      // Act
      const result = await firstValueFrom(serviceUnderTest.getComments());

      // Assert
      expect(result).toEqual(FAKE_DATA.comments);
      expect(localeStorageService.getValue).toHaveBeenCalledWith(LocalStorageKey.comments);
    });
  });

  describe('#changeComments', () => {
    it('should change the comments in api', async () => {
      // Arrange
      // Act
      const result = await firstValueFrom(serviceUnderTest.changeComments(FAKE_DATA.comments));

      // Assert
      expect(result).toEqual(FAKE_DATA.comments);
      expect(localeStorageService.setValue).toHaveBeenCalledWith(LocalStorageKey.comments, FAKE_DATA.comments);
    });
  });
});
