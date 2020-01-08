import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ControlsModule } from '@pko/commons/controls';
import { MessagesRoutingModule } from './messages-routing.module';

import { MessagesComponent } from './containers/messages/messages.component';
import { MessagesTableComponent } from './components/messages-table/messages-table.component';
import { MessageDateComponent } from './components/message-date/message-date.component';
import { MessagesThreadComponent } from './components/messages-thread/messages-thread.component';
import { MessageComponent } from './components/message/message.component';
import { MessageFormComponent } from './components/message-form/message-form.component';

@NgModule({
    declarations: [
        MessagesComponent,
        MessagesTableComponent,
        MessageDateComponent,
        MessagesThreadComponent,
        MessageComponent,
        MessageFormComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ControlsModule,
        MessagesRoutingModule
    ]
})
export class MessagesModule { }
