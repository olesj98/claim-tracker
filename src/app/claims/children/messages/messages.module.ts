import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { QuillModule } from 'ngx-quill';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { CommonAssetsModule } from '@pko/shared/common-assets';
import { MessagesRoutingModule } from './messages-routing.module';

import { MessagesComponent } from './containers/messages/messages.component';
import { MessengerComponent } from './components/messenger/messenger.component';
import { MessageComponent } from './components/message/message.component';
import { MessageInputComponent } from './components/message-input/message-input.component';

import { MessagePipes } from './pipes';

@NgModule({
    declarations: [
        MessagesComponent,
        MessengerComponent,
        MessageComponent,
        MessageInputComponent,
        ...MessagePipes
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AngularSvgIconModule,
        TranslateModule,
        QuillModule.forRoot({
            format: 'html',
            modules: {
                toolbar: [
                    [ 'bold', 'underline', 'italic' ]
                ]
            }
        }),
        CommonAssetsModule,
        MessagesRoutingModule
    ]
})
export class MessagesModule { }
