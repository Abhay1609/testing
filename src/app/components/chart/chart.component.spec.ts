import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartComponent } from './chart.component';
import { CommunicationService } from '../shared.service';
import { ChartModule } from 'primeng/chart';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { userData } from '../../dummyData';
import { USERDATA } from '../../app.models';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;
  let communicationService: jasmine.SpyObj<CommunicationService>;

  beforeEach(async () => {
    const communicationServiceSpy = jasmine.createSpyObj('CommunicationService', ['triggerTotalUpdate$']);

    await TestBed.configureTestingModule({
      imports: [ChartModule, DropdownModule, FormsModule],
      declarations: [ChartComponent],
      providers: [
        { provide: CommunicationService, useValue: communicationServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    communicationService = TestBed.inject(CommunicationService) as jasmine.SpyObj<CommunicationService>;
    communicationService.triggerTotalUpdate$.and.returnValue(of(userData));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.data).toEqual(userData);
    expect(component.users).toEqual([]);
    expect(component.value).toBe(false);
  });

  it('should get usernames', () => {
    const usernames = component.getusername();
    expect(usernames).toEqual(userData.map(user => user.name));
  });

  it('should update total and set users correctly', () => {
    component.updateTotal(userData);
    expect(component.data).toEqual(userData);
    expect(component.users).toEqual(userData.map(user => ({ name: user.name })));
  });

  it('should show data correctly when event is empty', () => {
    component.showData('');
    expect(component.value).toBe(false);
  });

  it('should show data correctly when event is not empty', () => {
    const mockEvent = { name: 'John Doe' };
    component.showData(mockEvent);
    expect(component.selectvalue).toBe('John Doe');
    expect(component.value).toBe(true);

    const selectedUser = userData.find(user => user.name === 'John Doe');
    if (selectedUser) {
      expect(component.usersData).toEqual(selectedUser);

      const timeArray = new Array(4).fill(0);
      for (const workout of selectedUser.workouts) {
        if (workout.type === 'Swimming') {
          timeArray[0] = workout.minutes;
        } else if (workout.type === 'Running') {
          timeArray[1] = workout.minutes;
        } else if (workout.type === 'Yoga') {
          timeArray[2] = workout.minutes;
        } else {
          timeArray[3] = workout.minutes;
        }
      }

      const expectedBasicData = {
        labels: ['Swimming', 'Running', 'Yoga', 'Cycling'],
        datasets: [
          {
            label: 'minutes',
            data: timeArray,
            backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
            borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
            borderWidth: 1
          }
        ]
      };

      expect(component.basicData).toEqual(expectedBasicData);
    }
  });

  it('should update chart options on initialization', () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    const expectedBasicOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };

    component.ngOnInit();
    expect(component.basicOptions).toEqual(expectedBasicOptions);
  });

  it('should handle triggerTotalUpdate subscription on init', () => {
    component.ngOnInit();
    expect(communicationService.triggerTotalUpdate$).toHaveBeenCalled();
    expect(component.data).toEqual(userData);
    expect(component.users).toEqual(userData.map(user => ({ name: user.name })));
  });
});
