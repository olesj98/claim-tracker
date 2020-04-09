import { Pipe, PipeTransform } from '@angular/core';

import { hrefGet, Link } from '@pko/core';

@Pipe({ name: 'documentHref' })
export class DocumentHrefPipe implements PipeTransform {
    transform(value: Array<Link>, rel: string): any {
        return hrefGet(value, rel);
    }
}
