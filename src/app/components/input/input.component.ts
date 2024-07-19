import { Component, EventEmitter, OnInit, Output,ViewChild } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { UserService } from './input.service';
import { TableComponent } from '../table/table.component';
import { CommunicationService } from '../shared.service';
import { workoutType } from '../../dummyData';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-input',
  standalone: true,
  imports: [FormsModule,InputTextModule,FloatLabelModule,DropdownModule,TableComponent,ButtonModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent  {
  // @Output() submitData=new EventEmitter<any>()

  activities=workoutType;
  selectedActivity='';
  username='';
  duration='';
  error=false;
  constructor(private userService: UserService, private communicationService: CommunicationService){

  }
  
  
  onSubmit(){
    
   
  this.userService.addData((userData: number) => {
    this.communicationService.triggerTotalUpdate(userData);
  },{
    name:this.username,
    time:this.duration,
    activity:this.selectedActivity,})
    this.error=this.userService.error
}



}
