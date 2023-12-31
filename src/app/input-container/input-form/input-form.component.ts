import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css'],
})
export class InputFormComponent {
  @Output() input_split_time = new EventEmitter<number>();
  @ViewChild('minuteInput') minutesInput!: ElementRef;

  onSubmit(form: NgForm) {
    const minutes = +form.value.minutes;
    const seconds = +form.value.seconds;
    this.input_split_time.emit(60*minutes + seconds);
    form.reset();
    this.minutesInput.nativeElement.focus();
  }
}
