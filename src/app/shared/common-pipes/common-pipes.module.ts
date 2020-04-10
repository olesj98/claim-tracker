import { NgModule } from '@angular/core';

import { UserInitialsPipe } from './user-initials.pipe';

@NgModule({
    declarations: [
        UserInitialsPipe
    ],
    exports: [
        UserInitialsPipe
    ]
})
export class CommonPipesModule { }
