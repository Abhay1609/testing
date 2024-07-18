import { TestBed } from '@angular/core/testing';
import { UserService } from './input.service';
import { DATA } from '../../app.models';
import { userData } from '../../dummyData';

describe('UserService', () => {
  let service: UserService;
  let mockCallback: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
    mockCallback = jasmine.createSpy('mockCallback');
  });

  it('should add a new user with a workout', () => {
    const data: DATA = { name: 'New User', activity: 'Running', time: '30' };
    service.addData(mockCallback, data);
    const newUser = userData.find((u) => u.name === 'New User');
    expect(newUser).toBeTruthy();
    expect(newUser?.workouts.length).toBe(1);
    expect(newUser?.workouts[0].type).toBe('Running');
    expect(newUser?.workouts[0].minutes).toBe(30);
    expect(mockCallback).toHaveBeenCalledWith(userData);
  });

  it('should add a new workout to an existing user', () => {
    const data: DATA = { name: 'John Doe', activity: 'Swimming', time: '40' };
    service.addData(mockCallback, data);
    const user = userData.find((u) => u.name === 'John Doe');
    const workout = user?.workouts.find((w) => w.type === 'Swimming');
    expect(workout).toBeTruthy();
    expect(workout?.minutes).toBe(40);
    expect(mockCallback).toHaveBeenCalledWith(userData);
  });

  it('should update the minutes for an existing workout', () => {
    const data: DATA = { name: 'John Doe', activity: 'Running', time: '20' };
    service.addData(mockCallback, data);
    const user = userData.find((u) => u.name === 'John Doe');
    const workout = user?.workouts.find((w) => w.type === 'Running');
    expect(workout).toBeTruthy();
    expect(workout?.minutes).toBe(20); // Assuming initial minutes were updated to 20
    expect(mockCallback).toHaveBeenCalledWith(userData);
  });

  it('should not add a new user if name or activity is empty', () => {
    const data: DATA = { name: '', activity: 'Running', time: '30' };
    service.addData(mockCallback, data);
    const newUser = userData.find((u) => u.name === '');
    expect(newUser).toBeUndefined();
    expect(mockCallback).toHaveBeenCalledWith(userData);
  });

  it('should add a new workout if name is not empty and activity is not empty', () => {
    const data: DATA = { name: 'Another User', activity: 'Yoga', time: '45' };
    service.addData(mockCallback, data);
    const newUser = userData.find((u) => u.name === 'Another User');
    expect(newUser).toBeTruthy();
    expect(newUser?.workouts.length).toBe(1);
    expect(newUser?.workouts[0].type).toBe('Yoga');
    expect(newUser?.workouts[0].minutes).toBe(45);
    expect(mockCallback).toHaveBeenCalledWith(userData);
  });
});
