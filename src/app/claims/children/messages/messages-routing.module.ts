import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MessagesComponent } from './containers/messages/messages.component';

const messagesRoutes: Routes = [
    { path: '', component: MessagesComponent }
];

@NgModule({
  imports: [
      RouterModule.forChild(messagesRoutes)
  ],
  exports: [
      RouterModule
  ]
})
export class MessagesRoutingModule { }
