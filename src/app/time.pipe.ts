import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time',
})
export class TimePipe implements PipeTransform {
  transform(value: number | 'x', ...args: any[]) {
    if (value === 'x') {
      return '&ndash;';
    } else {
      let timeValue = value as number;
      const seconds = timeValue % 60;
      const minutes = (timeValue - seconds) / 60;
      const timeSeconds = seconds.toString().padStart(2, '0');
      return minutes.toString() + ':' + timeSeconds;
    }
  }
}
