import { NgModule } from '@angular/core';

import { UserInitialsPipe } from './user-initials.pipe';
import { SanitazerPipe } from './sanitazer.pipe';

@NgModule({
    declarations: [
        UserInitialsPipe,
        SanitazerPipe
    ],
    exports: [
        UserInitialsPipe,
        SanitazerPipe
    ]
})
export class CommonAssetsModule { }
