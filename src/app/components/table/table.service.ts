import { Injectable } from "@angular/core";
import { userData } from "../../dummyData";
import { USERDATA,Workout } from '../../app.models';
@Injectable({providedIn:'any'})
export  class TableServices{

totaltime(workout:Workout[]){
    let i=0;
    for(let work of workout){
      i+=work.minutes;
    }
    return i;
}
selectedFilter(selectedValue: any){
    return userData.filter(record =>
        record.workouts.some(workout => workout.type === selectedValue))

}

   
       
  

}