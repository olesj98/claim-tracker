import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { FooterComponent } from './components/footer/footer.component';

@NgModule({
    declarations: [
        FooterComponent
    ],
    imports: [
        TranslateModule
    ],
    exports: [
        FooterComponent
    ]
})
export class FooterModule { }
