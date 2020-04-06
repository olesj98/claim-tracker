import { Pipe, PipeTransform } from '@angular/core';

import { User } from '@pko/auth';

@Pipe({ name: 'initials' })
export class UserInitialsPipe implements PipeTransform {
    transform(user: User): string {
        const [ name, surname ] = user.name.split(' ');

        return `${name[0].toUpperCase()}${surname[0].toUpperCase()}`;
    }
}
