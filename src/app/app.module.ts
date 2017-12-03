import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgResouresManagementModule} from 'ng-resoures-management';

import {AppComponent} from './app.component';


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        NgResouresManagementModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
