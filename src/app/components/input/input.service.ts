
import { Inject, Injectable } from "@angular/core";
import { DATA } from "../../app.models";
import { userData } from "../../dummyData";
@Injectable({providedIn:'any'})
export class UserService{
        error=false;
        
        data=userData
         index=-1;
         existingWorkout:{type:string,minutes:number}[]=[]
         existingindex=-1;
           

         addData(fun1:(userData:any)=>void,data:DATA){
            for(let i=0;i<userData.length;i++){
              if(userData[i].name==data.name){
                this.index=i;
                break;
              }
            }
            if(this.index!==-1){
              this.existingWorkout=userData[this.index].workouts
              for(let i=0;i<this.existingWorkout.length;i++){
                if(this.existingWorkout[i].type==data.activity){
                  this.existingindex=i;
                  break;
                }
              }
              if((!isNaN(+data.time) && !isNaN(parseFloat(data.time)))){
              if(this.existingindex!==-1){
                userData[this.index].workouts[this.existingindex].minutes=+data.time;
                this.index=-1;
                this.error=false
              }
              else{
                
                userData[this.index].workouts.push({type:data.activity,minutes:+data.time})
              this.error=false}
             
              }
                else{
                  this.error=true
                
              }
            }
            else{
                if(data.name!=''&&data.activity!=''&&(!isNaN(+data.time) && !isNaN(parseFloat(data.time)))){
                    //console.log(data.activity)
              userData.push({id:userData.length+1,name:data.name,workouts:[{type:data.activity,minutes:+data.time}]})
              
              this.index=-1;
            this.error=false}else{
                this.error=true;
              }

            }
            fun1(userData)

          }

}

