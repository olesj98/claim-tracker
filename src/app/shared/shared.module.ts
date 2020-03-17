import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';
import { TextMaskModule } from 'angular2-text-mask';

import { FormCheckerDirective } from '@pko/shared/validation';

const components = [
];

const directives = [
  FormCheckerDirective
];

@NgModule({
  declarations: [
    ...components,
    ...directives
  ],
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports: [
    CommonModule,
    TranslateModule,
    TextMaskModule,

    ...components,
    ...directives
  ]
})
export class SharedModule { }
