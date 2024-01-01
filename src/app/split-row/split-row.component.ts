import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-split-row',
  templateUrl: './split-row.component.html',
  styleUrls: ['./split-row.component.css'],
})
export class SplitRowComponent implements OnInit {
  @Input() split_name: string = '';
  @Input() split_pb: number | 'x' = 'x';

  ngOnInit(): void {
    
  }
}
