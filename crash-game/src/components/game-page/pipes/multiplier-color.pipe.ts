import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'multiplierColor',
  standalone: true,
})
export class MultiplierColorPipe implements PipeTransform {
  transform(multiplier: number | undefined): string {
    if (!multiplier) {
      return '';
    }

    if (multiplier >= 100) {
      return 'rgb(220,20,60)';
    }

    if (multiplier >= 10) {
      return 'rgb(195, 78, 209)';
    }

    if (multiplier >= 2) {
      return 'rgb(153, 80, 199)';
    }

    return 'rgb(80, 119, 199)';
  }
}
