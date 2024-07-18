import { TestBed } from '@angular/core/testing';
import { CommunicationService } from './shared.service';
import { Subject } from 'rxjs';

describe('CommunicationService', () => {
  let service: CommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have a triggerTotalUpdate Subject', () => {
    expect(service['\u005ftriggerTotalUpdate']).toBeInstanceOf(Subject);
  });

  it('triggerTotalUpdate$ should return an observable', () => {
    expect(service.triggerTotalUpdate$).toBeDefined();
    expect(typeof service.triggerTotalUpdate$.subscribe).toBe('function');
  });

  it('triggerTotalUpdate should trigger next with userData', (done) => {
    const testData = { name: 'John Doe', activity: 'Running', time: '30' };

    service.triggerTotalUpdate$.subscribe((data) => {
      expect(data).toEqual(testData);
      done();
    });

    service.triggerTotalUpdate(testData);
  });
});
