import { Component,Input,OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { userData } from '../../dummyData';
import { CommunicationService } from '../shared.service';
import { workoutType } from '../../dummyData';
import { USERDATA } from '../../app.models';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [ChartModule,DropdownModule,FormsModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent implements OnInit {
  // @Input() data!:Data[];
  data=userData
  users: { name: string }[] = [];
  basicData: any;
  value:boolean=false;

  basicOptions: any;
  usersData!:USERDATA;

  constructor(private communicationService: CommunicationService) { }

  getusername(): string[] {

    return this.data?.map(item => item.name) || [];
  }
  updateTotal(userData:any) {
    this.data=userData;
    this.getusername();
    this.showData('');
    this.users = this.getusername()?.map(name => ({ name })) || [];
  

  }
  
  selectvalue='';
  showData(event:any){
    if(event!==''){

      this.selectvalue=event.name
    }
    let selectedValue=this.selectvalue;
   console.log(selectedValue)
    if(selectedValue==''){
      this.value=false
    }else{
      this.value=true;
     for(let i of this.data){
      if(i.name===selectedValue){
        this.usersData=i;
        break;
      }
     }
     let timeArray=new Array(4).fill(0)
     for(let i of this.usersData.workouts){
      if(i.type==="Swimming"){
        timeArray[0]=i.minutes
      }else if(i.type==="Running"){
        timeArray[1]=i.minutes
      }else if(i.type==="Yoga"){
        timeArray[2]=i.minutes
      }else{
        timeArray[3]=i.minutes
      }

     }
     
this.basicData = {
      labels: workoutType ,
     
      datasets: [
          {

              label: 'minutes',
              data: timeArray,
              backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
              borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
              borderWidth: 1
          }
      ]
  };}
  }
  ngOnInit() {
    this.communicationService.triggerTotalUpdate$.subscribe((userData:any) => {
      this.updateTotal(userData);
    });
    this.users = this.getusername()?.map(name => ({ name })) || [];
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
   
 

      this.basicOptions = {
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
  }
}
