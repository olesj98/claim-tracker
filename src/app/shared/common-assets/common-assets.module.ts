import { NgModule } from '@angular/core';

import { UserInitialsPipe } from './user-initials.pipe';
import { SanitazerPipe } from './sanitazer.pipe';
import { StickyDirective } from './sticky.directive';

@NgModule({
    declarations: [
        UserInitialsPipe,
        SanitazerPipe,
        StickyDirective
    ],
    exports: [
        UserInitialsPipe,
        SanitazerPipe,
        StickyDirective
    ]
})
export class CommonAssetsModule { }
