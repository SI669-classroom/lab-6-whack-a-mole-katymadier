import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

    public score: number;
    public scoreList: any[] = [];
    public loaded: boolean=false;

    constructor(public storage: Storage){

    }

    dsSaveScore(data):void {
      console.log("saving score with dataService", data)
      this.score = data;
      this.storage.set('score', data);
    }

    getLatestScore() {
      this.storage.get('score').then((result)=>{
        if (!result){
          console.log("score was null")
          this.score=0;
        } else {
          this.score = result;
          console.log("score from storage", this.score)
        }
      });
    }
    getLeaderboardData(){
      console.log("getting data from leaderboard");
      return this.storage.get('leaderboard').then((result)=>{
        if (!result){
          this.scoreList=[]
          console.log("nothing in leaderboard", this.scoreList);
        } else {
          this.scoreList = JSON.parse(result);
          console.log("stuff in leaderboard", this.scoreList);
          this.sortData();
          this.saveLeaderboard();
        }
      });
    }

    sortData():void {
      console.log("sorting scores");
      this.scoreList.sort(function(a,b){
        if(a.score>b.score){
          return-1;
        } else {
          return 1;
        }
      })
      console.log("updating list", this.scoreList);
      this.scoreList.push({
        score: this.score,
        time: Date.now()
      })
    }

    saveLeaderboard(): void {
      this.storage.set('leaderboard', JSON.stringify(this.scoreList));
    }
}
