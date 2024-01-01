import { Component, OnInit } from '@angular/core';
import {
  SplitNames,
  DataService,
  SplitData,
  DummySplitData,
  DummySplitNames,
} from './data-service.service';
import { DummySplitRowData, SplitRowData } from './split-row-data.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = "Angular Livesplit"
  total_attempts: number = 0;
  split_names: SplitNames = DummySplitNames;
  pb_split: SplitData = DummySplitData;
  gold_deltas: SplitData = DummySplitData;

  current_run_data: SplitData = DummySplitData;

  constructor(private data: DataService) {}

  ngOnInit(): void {
    this.data.splitNamesSubj.subscribe((splits) => {
      this.split_names = splits;
    });
    this.data.pbRunSubj.subscribe((data) => {
      this.pb_split = data
      this.total_attempts = this.data.getTotalRuns();
      console.log(this.pb_split);
    });
    this.data.goldDeltaSubj.subscribe((data) => (this.gold_deltas = data));
  }
}
