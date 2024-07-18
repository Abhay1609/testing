export type DATA={
    name:string,
    time:string,
    activity:string
  }
export type Workout={
    type:string,
    minutes:number
}
export type USERDATA={
    name:string,
    id:number,
    workouts:{
      type:string,
      minutes:number
    }[],
  
  }
