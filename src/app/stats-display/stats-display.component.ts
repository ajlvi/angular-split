import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-stats-display',
  templateUrl: './stats-display.component.html',
  styleUrls: ['./stats-display.component.css']
})
export class StatsDisplayComponent implements OnChanges {
  @Input() prevSplit: number = 0
  @Input() prevSplitToPB: (number | "x") = 0;
  @Input() prevSplitToGold: (number | "x") = 0;
  @Input() bestPossible: number = 0;
  @Input() sumOfBest: number = 0;

  prevToPBMinus: boolean = false;
  prevToGoldMinus: boolean = false;

  ngOnChanges(): void {
    this.prevToPBMinus = (this.prevSplitToPB !== "x" && this.prevSplitToPB < 0)
    this.prevToGoldMinus = (this.prevSplitToGold !== "x" && this.prevSplitToGold < 0)
  }
}
