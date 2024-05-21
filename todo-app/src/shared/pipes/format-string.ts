import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatString',
})
export class FormatString implements PipeTransform {
  transform(string: string): string {
    const formattedString = string.replace('-', ' ').toLowerCase();
    return formattedString.charAt(0).toUpperCase() + formattedString.slice(1);
  }
}
