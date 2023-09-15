import { SafePipe } from './safe.pipe';
import { DomSanitizer } from '@angular/platform-browser';
import { TestBed } from '@angular/core/testing';
import { Data, DataType } from '@shared';

describe('SafePipe', () => {
  let pipeUnderTest: SafePipe;
  let domSanitizer: DomSanitizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SafePipe,
        { provide: DomSanitizer, useValue: {} },
      ],
    });
  });

  beforeEach(() => {
    pipeUnderTest = TestBed.inject(SafePipe);

    domSanitizer = TestBed.inject(DomSanitizer);
    domSanitizer.bypassSecurityTrustHtml = jasmine.createSpy('bypassSecurityTrustHtml').and.callThrough();
    domSanitizer.bypassSecurityTrustStyle = jasmine.createSpy('bypassSecurityTrustStyle').and.callThrough();
    domSanitizer.bypassSecurityTrustScript = jasmine.createSpy('bypassSecurityTrustScript').and.callThrough();
    domSanitizer.bypassSecurityTrustUrl = jasmine.createSpy('bypassSecurityTrustUrl').and.callThrough();
    domSanitizer.bypassSecurityTrustResourceUrl = jasmine.createSpy('bypassSecurityTrustResourceUrl').and.callThrough();
  });

  it('should create an instance of the pipe', () => {
    // Arrange
    // Act
    // Assert
    expect(pipeUnderTest).toBeTruthy();
  });

  describe('#transform', () => {
    [
      {
        expectation: `should call the bypassSecurityTrustHtml method of domSanitizer if the data type is ${Data.Html}`,
        value: '<div>Hello</div>',
        type: Data.Html,
        methodToBeCalled: 'bypassSecurityTrustHtml',
      },
      {
        expectation: `should call the bypassSecurityTrustStyle method of domSanitizer if the data type is ${Data.Style}`,
        value: 'color: red;',
        type: Data.Style,
        methodToBeCalled: 'bypassSecurityTrustStyle',
      },
      {
        expectation: `should call the bypassSecurityTrustScript method of domSanitizer if the data type is ${Data.Script}`,
        value: 'alert("Hello")',
        type: Data.Script,
        methodToBeCalled: 'bypassSecurityTrustScript',
      },
      {
        expectation: `should call the bypassSecurityTrustUrl method of domSanitizer if the data type is ${Data.Url}`,
        value: 'https://example.com',
        type: Data.Url,
        methodToBeCalled: 'bypassSecurityTrustUrl',
      },
      {
        expectation: `should call the bypassSecurityTrustResourceUrl method of domSanitizer if the data type is ${Data.ResourceUrl}`,
        value: 'https://example.com/resource',
        type: Data.ResourceUrl,
        methodToBeCalled: 'bypassSecurityTrustResourceUrl',
      },
    ].forEach(({ expectation, value, type, methodToBeCalled }) => {
      it(expectation, () => {
        // Arrange
        // Act
        pipeUnderTest.transform(value, type);

        // Assert
        expect(domSanitizer[methodToBeCalled as (keyof DomSanitizer)]).toHaveBeenCalledWith(value);
      });
    });

    it('should return undefined for unknown type', () => {
      const value = 'some value';
      const result = pipeUnderTest.transform(value, 'UnknownType' as DataType);

      expect(result).toBe(undefined);
    });
  });
});
