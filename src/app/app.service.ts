

import { userData } from "./dummyData";

import { Inject, Injectable } from "@angular/core";
import { DATA,Workout } from "./app.models";
@Injectable({providedIn:'any'})
export class UserService{
    userData = userData;
         index=-1;
         existingWorkout:Workout[]=[]
         existingindex=-1;
         onSubmit(data:DATA){
            for(let i=0;i<this.userData.length;i++){
              if(this.userData[i].name==data.name){
                this.index=i;
                break;
              }
            }
            if(this.index!==-1){
              this.existingWorkout=this.userData[this.index].workouts
              for(let i=0;i<this.existingWorkout.length;i++){
                if(this.existingWorkout[i].type==data.activity){
                  this.existingindex=i;
                  break;
                }
              }
              if(this.existingindex!==-1){
                this.userData[this.index].workouts[this.existingindex].minutes=+data.time;
                this.index=-1;
              }
              else{
                this.userData[this.index].workouts.push({type:data.activity,minutes:+data.time})
              }
            }
            else{

              this.userData.push({id:this.userData.length+1,name:data.name,workouts:[{type:data.activity,minutes:+data.time}]})

              this.index=-1;

            }

          }

}

