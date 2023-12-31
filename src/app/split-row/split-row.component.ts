import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-split-row',
  templateUrl: './split-row.component.html',
  styleUrls: ['./split-row.component.css'],
})
export class SplitRowComponent {
  @Input() split_name: string = '';
}
