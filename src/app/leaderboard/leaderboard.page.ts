import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { DataService } from '../data.service';
import { Storage } from '@ionic/storage';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.page.html',
  styleUrls: ['./leaderboard.page.scss'],
})

export class LeaderboardPage implements OnInit {
  score: number;
  scoreList: any[] = [];

  constructor(
    public navCtrl: NavController,
    public dataService: DataService,
    public storage: Storage,
    public router: RouterModule) {
      this.storage.get('score').then((val) => {
        this.score = val;
      });
    }

  ngOnInit() {
    // get score from saved score
    this.storage.get('score').then((val) => {
      if (val==null){
        this.score = 0;
        console.log("Score was null", this.score);
      }
      else {
        this.score = val;
        console.log("Pulled score from storage", this.score);
      }
      // get from leaderboard
      this.storage.get('leaderboard').then((result) => {
        let res;
        if (!result) {
          res = []
          console.log("nothing in leaderboard", res);
        }
        else {
          res = JSON.parse(result);
          console.log("stuff in leaderboard", res);
        }
        // push scores to list
        console.log("the score", this.score)
        res.push({
          score: this.score,
          time: Date.now()
        });
        //sort scores
        this.scoreList = res.sort(function(a, b) {
          if (a.score > b.score) {
            return -1;
          } else {
            return 1;
          }
        });
        // save scores back to leaderboard
        this.storage.set('leaderboard', JSON.stringify(this.scoreList));
      });
    });
  }
}
