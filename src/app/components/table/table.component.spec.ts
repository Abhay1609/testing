import { TestBed, ComponentFixture } from '@angular/core/testing';
import { TableComponent } from './table.component';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { CommunicationService } from '../shared.service';
import { TableServices } from './table.service';
import { BehaviorSubject } from 'rxjs';
import { userData, workoutType } from '../../dummyData';

describe('TableComponent', () => {
    let component: TableComponent;
    let fixture: ComponentFixture<TableComponent>;
    let communicationService: CommunicationService;

    // beforeEach(async () => {
    //     await TestBed.configureTestingModule({
    //         declarations: [TableComponent],
    //         imports: [TableModule, DropdownModule, FormsModule],
    //         providers: [CommunicationService, TableServices]
    //     }).compileComponents();

    //     fixture = TestBed.createComponent(TableComponent);
    //     component = fixture.componentInstance;
    //     communicationService = TestBed.inject(CommunicationService);
    // });

    it('should create', () => {
     
        expect(component).toBeTruthy();
    });

    // it('should subscribe to triggerTotalUpdate$ and update records', () => {
    //     const usersData = [...userData];
    //     const subject = new BehaviorSubject<any>(usersData);
    //     spyOn(communicationService, 'triggerTotalUpdate$').and.returnValue(subject.asObservable());

    //     fixture.detectChanges(); // ngOnInit

    //     subject.next(usersData); // Simulate data emission

    //     expect(component.records).toEqual(usersData);
    //     expect(component.totalRecords).toEqual(usersData.length);
    // });

    it('should calculate total time', () => {
        const testData = [
            { type: 'Running', minutes: 30 },
            { type: 'Cycling', minutes: 45 }
        ];
        spyOn(component.tableservice, 'totaltime').and.returnValue(75);

        const result = component.calculate(testData);

        expect(result).toEqual(75);
    });

    it('should filter records by selected value', () => {
        const selectedValue = 'Running';
        spyOn(component.tableservice, 'selectedFilter').and.returnValue(userData.filter(record =>
            record.workouts.some(workout => workout.type === selectedValue)
        ));

        component.onSelectionChange(selectedValue);

        expect(component.records).toEqual(userData.filter(record =>
            record.workouts.some(workout => workout.type === selectedValue)
        ));
    });
});
