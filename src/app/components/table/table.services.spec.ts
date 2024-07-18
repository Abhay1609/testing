// import { TableService } from "primeng/table"
// import { TableServices } from "./table.service"

// describe('TableService',()=>{
//     it("should return total time of workout",()=>{
//         const tableservice=new TableServices
//         let input=[{type:"Swimming",minutes:90},{type:"Cycling",minutes:45}]
//         const result=tableservice.totaltime(input)
//         expect(result).toBe(135)
//     })
//     it("should return filtered value",()=>{
//         const tableservice=new TableServices
//         let output=[{
//             name:"name",
//             id:0,
//             workouts:[
//                 {
//                     type:"Yoga",
//                     minute:0,
//                 }
//             ]

//         },
//         {
//             name:"name",
//             id:0,
//             workouts:[
//                 {
//                     type:"Yoga",
//                     minute:0,
//                 }
//             ]

//         },]
//         let input="Yoga"
//         const result=tableservice.selectedFilter(input);
//         expect(result).toBe(output)
//     })

// })        
import { TestBed } from '@angular/core/testing';
import { TableServices } from './table.service';
import { userData } from '../../dummyData';

describe('TableServices', () => {
    let service: TableServices;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TableServices]
        });
        service = TestBed.inject(TableServices);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });



    it('should calculate total time', () => {
        const testData = [
            { type: 'Running', minutes: 30 },
            { type: 'Cycling', minutes: 45 }
        ];
        const result = service.totaltime(testData);
        expect(result).toEqual(75); // 30 + 45 = 75
    });

    it('should filter records by selected value', () => {
        const selectedValue = 'Running';
        const filteredRecords = service.selectedFilter(selectedValue);
        const expectedRecords = userData.filter(record =>
            record.workouts.some(workout => workout.type === selectedValue)
        );
        expect(filteredRecords).toEqual(expectedRecords);
    });
    it('should return all',()=>{
        const selectedValue='All';
        const filteredRecords = service.selectedFilter(selectedValue);
        const expectedRecords=userData
        expect(filteredRecords).toEqual([])
    })
});