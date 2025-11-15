import { Component } from '@angular/core';

@Component({
  selector: 'app-stats-display',
  templateUrl: './stats-display.component.html',
  styleUrls: ['./stats-display.component.css']
})
export class StatsDisplayComponent {
  prevToPBMinus: boolean = false;
  prevToGoldMinus: boolean = true;
  prevSplit: number = 26;
  prevSplitToPB: number = 5;
  prevSplitToGold: number = 3;

  bestPossible: number = 1230
  sumOfBest: number = 1179
}
