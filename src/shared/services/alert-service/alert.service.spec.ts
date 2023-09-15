import { AlertService } from './alert.service';
import { TestBed } from '@angular/core/testing';

describe('AlertService', () => {
  let serviceUnderTest: AlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlertService],
    });
  });

  beforeEach(() => {
    serviceUnderTest = TestBed.inject(AlertService);
  });

  it('should create an instance of the service', () => {
    // Arrange
    // Act
    // Assert
    expect(serviceUnderTest).toBeTruthy();
  });

  describe('#showAlert', () => {
    it('should call the alert method of window', () => {
      // Arrange
      spyOn(window, 'alert').and.callThrough();

      const message = 'fake-message';

      // Act
      serviceUnderTest.showAlert(message);

      // Assert
      expect(window.alert).toHaveBeenCalledWith(message);
    });
  });
});
