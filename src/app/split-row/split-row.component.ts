import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-split-row',
  templateUrl: './split-row.component.html',
  styleUrls: ['./split-row.component.css'],
})
export class SplitRowComponent implements OnChanges {
  @Input() split_name: string = '';
  @Input() split_pb: number | 'x' = 'x';
  @Input() run_split: number | 'x' = 'x';
  @Input() is_gold: boolean = false;

  time_delta: number | 'x' = 'x'

  ngOnChanges(): void {
    if (this.run_split !== 'x' && this.run_split) {
      this.time_delta = +this.run_split - +this.split_pb;
    }
    else (
      this.time_delta = 'x'
    )
  }
}
