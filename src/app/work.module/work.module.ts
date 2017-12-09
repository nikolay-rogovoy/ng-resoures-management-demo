import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {NgResouresManagementModule} from 'ng-resoures-management';
import {WorkComponent} from './work.component';


@NgModule({
    declarations: [
        WorkComponent
    ],
    imports: [
        CommonModule,
        NgResouresManagementModule
    ],
    exports: [
        WorkComponent
    ],
    providers: []
})
export class WorkModule { }
