import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {NgResouresManagementModule} from 'ng-resoures-management';
import {WorkComponent} from './work.component';
import {NavbarComponent} from './navbar.component';


@NgModule({
    declarations: [
        WorkComponent,
        NavbarComponent
    ],
    imports: [
        CommonModule,
        NgResouresManagementModule
    ],
    exports: [
        WorkComponent,
        NavbarComponent
    ],
    providers: []
})
export class WorkModule { }
