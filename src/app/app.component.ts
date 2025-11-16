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
  total_splits: number = 0;
  split_names: SplitNames = DummySplitNames;
  pb_split: SplitData = DummySplitData;

  previous_split: number = 0;
  previous_to_pb: number | 'x' = 0;
  previous_to_gold: number = 0;
  best_possible: number = 0;
  sum_of_best: number = 0;
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
    });
    this.data.goldDeltaSubj.subscribe((data) => {
      this.gold_deltas = data;
      this.sum_of_best = data.splits.reduce(
        (partial: number, s) => partial + parseInt(s.toString()),
        0
      );
      this.best_possible = this.sum_of_best;
    });
  }

  todaysDate(): string {
    let dateObj = new Date();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObj.getDay().toString().padStart(2, '0');
    const year = dateObj.getFullYear().toString();
    return `${year}-${month}-${day}`;
  }

  handleNewSplit(ev: { split_index: number; split_value: number }) {
    // add current split to this run's data
    this.current_run_data.splits[ev.split_index] = ev.split_value;
    // calculate current split
    if (ev.split_index == 0) {
      this.previous_split = ev.split_value;
    } else {
      this.previous_split =
        ev.split_value - +this.current_run_data.splits[ev.split_index - 1];
    }
    // update split to PB
    this.previous_to_pb =
      ev.split_value - +this.pb_split.splits[ev.split_index];
    // update split to gold
    this.previous_to_gold =
      this.previous_split - +this.gold_deltas.splits[ev.split_index];
    // update cumulative totals
    this.best_possible += this.previous_to_gold;
    if (this.previous_to_gold < 0) { this.sum_of_best += this.previous_to_gold; }
  }

  handleSaveCommand() {
    this.data.saveRun(this.current_run_data);
    //this will fire a new pb split which should clear current_run_data.
  }
}
