import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { InputComponent } from './input.component';
import { UserService } from './input.service';
import { CommunicationService } from '../shared.service';
import { workoutType } from '../../dummyData';
import { TableComponent } from '../table/table.component';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let communicationService: jasmine.SpyObj<CommunicationService>;

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['addData']);
    const communicationServiceSpy = jasmine.createSpyObj('CommunicationService', ['triggerTotalUpdate']);

    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        InputTextModule,
        FloatLabelModule,
        DropdownModule,
        ButtonModule,
        TableComponent,
        InputComponent // Import the standalone component here
      ],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: CommunicationService, useValue: communicationServiceSpy }
      ]
    }).compileComponents();

    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    communicationService = TestBed.inject(CommunicationService) as jasmine.SpyObj<CommunicationService>;

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have workout types', () => {
    expect(component.activities).toEqual(workoutType);
  });

  it('should initialize with default values', () => {
    expect(component.selectedActivity).toBe('');
    expect(component.username).toBe('');
    expect(component.duration).toBe('');
  });

  it('should call userService.addData and communicationService.triggerTotalUpdate on onSubmit', () => {
    component.username = 'John Doe';
    component.duration = '30';
    component.selectedActivity = 'Running';

    const mockUserData = [
      {
        id: 1,
        name: 'John Doe',
        workouts: [
          { type: 'Running', minutes: 30 },
          { type: 'Cycling', minutes: 45 }
        ]
      },
      {
        id: 2,
        name: 'Jane Smith',
        workouts: [
          { type: 'Swimming', minutes: 60 },
          { type: 'Running', minutes: 20 }
        ]
      },
      {
        id: 3,
        name: 'Mike Johnson',
        workouts: [
          { type: 'Yoga', minutes: 50 },
          { type: 'Cycling', minutes: 40 }
        ]
      }
    ];

    userService.addData.and.callFake((callback: (userData: any) => void, data: any) => {
      callback(mockUserData);
    });

    component.onSubmit();

    expect(userService.addData).toHaveBeenCalledWith(jasmine.any(Function), {
      name: component.username,
      time: component.duration,
      activity: component.selectedActivity
    });
    expect(communicationService.triggerTotalUpdate).toHaveBeenCalledWith(mockUserData);
  });

  it('should not call services if username or selectedActivity is empty', () => {
    component.username = '';
    component.duration = '30';
    component.selectedActivity = '';

    component.onSubmit();

    expect(userService.addData).not.toHaveBeenCalled();
    expect(communicationService.triggerTotalUpdate).not.toHaveBeenCalled();

    component.username = 'John Doe';
    component.duration = '30';
    component.selectedActivity = '';

    component.onSubmit();

    expect(userService.addData).not.toHaveBeenCalled();
    expect(communicationService.triggerTotalUpdate).not.toHaveBeenCalled();

    component.username = '';
    component.duration = '30';
    component.selectedActivity = 'Running';

    component.onSubmit();

    expect(userService.addData).not.toHaveBeenCalled();
    expect(communicationService.triggerTotalUpdate).not.toHaveBeenCalled();
  });
});
