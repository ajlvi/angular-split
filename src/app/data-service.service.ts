import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface SplitNames {
  category: string;
  split_names: string[];
}

export interface SplitData {
  date: string;
  splits: (number | 'x')[];
}

export const DummySplitNames: SplitNames = { category: '', split_names: [] };
export const DummySplitData: SplitData = { date: '', splits: [] };

@Injectable({ providedIn: 'root' })
export class DataService {
  split_prefix: string = '';
  split_names: SplitNames = DummySplitNames;
  pb_run: SplitData = DummySplitData;
  gold_deltas: SplitData = DummySplitData;
  all_splits: SplitData[] = [];

  splitNamesSubj = new BehaviorSubject<SplitNames>(DummySplitNames);
  pbRunSubj = new BehaviorSubject<SplitData>(DummySplitData);
  goldDeltaSubj = new BehaviorSubject<SplitData>(DummySplitData)

  constructor(private http: HttpClient) {
    //ajlvi 231228 some game select logic should eventually exist
    //when it does then we should default to agnostic about what splits are being loaded
    //for now there's only tetris attack so i'll default to that
    this.split_prefix = 'tetris-attack';
    this.manageSplitNames(this.split_prefix);
  }

  manageSplitNames(prefix: string) {
    const split_path = '../assets/' + prefix + '.splits.json';
    this.http.get(split_path).subscribe((res) => {
      let typed_res: SplitNames = res as SplitNames;
      this.splitNamesSubj.next(typed_res);
      this.split_names = typed_res;
      this.getRunsInfo(prefix);
    });
  }

  getRunsInfo(prefix: string) {
    const runs_path = '../assets/' + prefix + '.runs.json';
    this.http.get(runs_path).subscribe((res) => {
      //this typing suggestion came from https://stackoverflow.com/q/76157697
      const typed_res: typeof res & { [k: string]: any } = res;
      this.all_splits = typed_res['runs'];
      this.processRuns();
    });
  }

  processRuns() {
    //this will be called after we've initialized all_splits
    //first we'll get the PB run and hold that; then we'll calculate golds
    const total_splits = this.split_names['split_names'].length;
    const final_splits = this.all_splits.map(
      (run) => run['splits'][total_splits - 1]
    );
    //filtering out ripped runs
    const completed_splits = final_splits.filter((x) => !isNaN(+x)) as number[];
    const pb = Math.min(...completed_splits);
    const pb_run_index = final_splits.indexOf(pb);
    this.pb_run = this.all_splits[pb_run_index];
    this.pbRunSubj.next(this.pb_run);

    let gold_split_times: number[] = [];
    for (let i = 0; i < total_splits; i++) {
      let relevant_runs = this.all_splits.filter(
        (run) => run['splits'][i] !== 'x'
      );
      let all_ith_splits = relevant_runs.map(
        (run) =>
          (run.splits[i] as number) -
          (i > 0 ? (run.splits[i - 1] as number) : 0)
      );
      gold_split_times.push( Math.min(...all_ith_splits) )
    }
    this.gold_deltas = {date: "gold", splits: gold_split_times }
    this.goldDeltaSubj.next(this.gold_deltas)
  }

  getTotalRuns(): number {
    return this.all_splits.length
  }

  saveRun(current_run: SplitData) {
    //the idea comes from https://stackoverflow.com/a/75766913.
    const current_splits = current_run.splits.slice();
    const saved_run: SplitData = { date: current_run.date, splits: current_splits }
    this.all_splits.push(saved_run)
    let runs_dict = { "runs" : this.all_splits }
    const output_text = JSON.stringify(runs_dict)

    const blob = new Blob([output_text], {type: 'text/json'});

    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = this.split_prefix + '.runs.json';
    link.click();

    this.processRuns()
  }

}
