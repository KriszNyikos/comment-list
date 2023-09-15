import { TestBed } from '@angular/core/testing';
import { LocalizationService } from './localization.service';
import { TranslateService } from '@ngx-translate/core';
import { Language } from '../../enums';
import { BehaviorSubject } from 'rxjs';

describe('LocalizationService', () => {
  let serviceUnderTest: LocalizationService;
  let translate: TranslateService;

  class FakeTranslateService {
    get currentLang(): string {
      return currentLanguage$.value as string;
    }

    use(lang: string): void {}
  }

  const currentLanguage$ = new BehaviorSubject<Language | undefined>(undefined);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LocalizationService,
        { provide: TranslateService, useClass: FakeTranslateService },
      ],
    });
  });

  beforeEach(() => {
    serviceUnderTest = TestBed.inject(LocalizationService);

    translate = TestBed.inject(TranslateService);
    translate.use = jasmine.createSpy('use').and.callThrough();
  });

  it('should create an instance of the service', () => {
    // Arrange
    // Act
    // Assert
    expect(serviceUnderTest).toBeTruthy();
  });

  describe('#toggleLanguage', () => {
    [
      {
        expectation: `should set the ${Language.de} language if the current is ${Language.en}`,
        currentLanguage: Language.en,
        shouldBe: Language.de,
      },
      {
        expectation: `should set the ${Language.en} language if the current is ${Language.de}`,
        currentLanguage: Language.de,
        shouldBe: Language.en,
      },
    ].forEach(({ expectation, currentLanguage, shouldBe }) => {
      it(expectation, () => {
        // Arrange
        currentLanguage$.next(currentLanguage);

        // Act
        serviceUnderTest.toggleLanguage();

        // Assert
        expect(translate.use).toHaveBeenCalledWith(shouldBe);
      });
    });
  });
});
