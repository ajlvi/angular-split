import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DummySplitNames, SplitNames } from '../data-service.service';

@Component({
  selector: 'app-input-container',
  templateUrl: './input-container.component.html',
  styleUrls: ['./input-container.component.css']
})
export class InputContainerComponent {
  @Input() split_names: SplitNames = DummySplitNames;
  @Output() new_split = new EventEmitter<{split_index: number, split_value: number}>;
  @Output() save = new EventEmitter<boolean>();
  active_split: number = 0; 
  confirmed_save: boolean = false;

  handleSplit(split: number) {
    this.new_split.emit({split_index: +this.active_split, split_value: split})
    this.active_split++;
  }

  onSave() {
    if (!this.confirmed_save) {
      this.confirmed_save = true;
    }
    else {
      this.save.emit(true);
      this.confirmed_save = false;
      this.active_split = 0;
    }
  }
}
