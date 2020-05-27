import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'initials' })
export class UserInitialsPipe implements PipeTransform {
    transform(fullName: string): string {
        const [ name, surname ] = fullName.split(' ');

        return `${name[0].toUpperCase()}${surname[0].toUpperCase()}`;
    }
}
