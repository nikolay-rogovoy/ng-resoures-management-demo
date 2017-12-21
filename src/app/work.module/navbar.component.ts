import {Component} from '@angular/core';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html'
})
export class NavbarComponent {

    /***/
    isAuth = true;

    /***/
    logOut() {
        console.log('logOut');
        this.isAuth = false;
    }
}
