import { LocaleStorageService, LocalStorageKey } from '@shared';
import { TestBed } from '@angular/core/testing';

describe('LocaleStorageService', () => {
  let serviceUnderTest: LocaleStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocaleStorageService],
    });
  });

  beforeEach(() => {
    serviceUnderTest = TestBed.inject(LocaleStorageService);

    spyOn(localStorage, 'setItem').and.callThrough();
    spyOn(localStorage, 'getItem').and.callThrough();
  });

  it('should create an instance of the service', () => {
    // Arrange
    // Act
    // Assert
    expect(serviceUnderTest).toBeTruthy();
  });

  describe('#setValue', () => {
    it('should call the setItem method of localStorage', () => {
      // Arrange
      const key = LocalStorageKey.comments;
      const value = ['fake-value'];

      // Act
      serviceUnderTest.setValue(key, value);

      // Assert
      expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(value));
    });
  });

  describe('#getValue', () => {
    it('should return the value of it exists', () => {
      // Arrange
      const key = LocalStorageKey.comments;

      // Act
      serviceUnderTest.getValue(key);

      // Assert
      expect(localStorage.getItem).toHaveBeenCalledWith(key);
    });
  });
});
