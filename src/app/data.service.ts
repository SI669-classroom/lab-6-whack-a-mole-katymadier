import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

    constructor(public storage: Storage){

    }

    getData(): Promise<any> {
      return this.storage.get('leaderboard');
    }

    save(data): void {

      let saveData = [];

      //Remove observables
      data.forEach((entry) => {
        saveData.push({
          score: entry.score,
          time: entry.time
        });
      });

      let newData = JSON.stringify(saveData);
      this.storage.set('leaderboard', newData);
    }
}
