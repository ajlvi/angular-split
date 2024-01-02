import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time',
})
export class TimePipe implements PipeTransform {
  transform(value: number | 'x', signed: boolean = false) {
    if (value === 'x') {
      return '&ndash;';
    } else {
      let timeValue = value as number;
      let sign = timeValue >= 0 ? '+' : '-';
      timeValue = Math.abs(timeValue);
      const seconds = timeValue % 60;
      const minutes = (timeValue - seconds) / 60;
      const timeSeconds = seconds.toString().padStart(2, '0');
      return (signed? sign : '') + minutes.toString() + ':' + timeSeconds;
    }
  }
}
