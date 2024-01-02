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
  title = 'Angular Livesplit';
  total_attempts: number = 0;
  total_splits: number = 0
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
      this.pb_split = data;
      this.current_run_data.splits = new Array(data.splits.length).fill('x');
      this.current_run_data.date = this.todaysDate();
      this.total_attempts = this.data.getTotalRuns();
      this.total_splits = this.pb_split.splits.length;
      console.log(this.pb_split);
    });
    this.data.goldDeltaSubj.subscribe((data) => (this.gold_deltas = data));
  }

  todaysDate(): string {
    let dateObj = new Date();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObj.getDay().toString().padStart(2, '0');
    const year = dateObj.getFullYear().toString();
    return `${year}-${month}-${day}`;
  }

  handleNewSplit(ev: { split_index: number; split_value: number }) {
    this.current_run_data.splits[ev.split_index] = ev.split_value;
    console.log(this.current_run_data);
  }
}
