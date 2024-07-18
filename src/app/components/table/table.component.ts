import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommunicationService } from '../shared.service';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { userData,workoutType } from '../../dummyData';
import { USERDATA,Workout } from '../../app.models';
import { TableServices } from './table.service';
@Component({
  selector: 'app-table',
  standalone: true,
  imports: [TableModule,DropdownModule,FormsModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit {

activities = ["All",...workoutType]
records=userData;
totalRecords=userData.length;
constructor(public tableservice:TableServices,public communicationService: CommunicationService) { }
ngOnInit(): void {
this.communicationService.triggerTotalUpdate$.subscribe((usersData:any) => {
      this.records=usersData
      this.totalRecords=usersData.length;
    });
  }
  calculate(workout:Workout[]){
    return this.tableservice.totaltime(workout)

  }
  onSelectionChange(selectedValue: any) {
    this.records=selectedValue==='All'?userData:this.tableservice.selectedFilter(selectedValue)
}

}
