import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css'],
})
export class InputFormComponent {
  onSubmit(form: NgForm) {
    const minutes = form.value.minutes;
    const seconds = form.value.seconds;
    console.log(minutes, seconds);
  }
}
