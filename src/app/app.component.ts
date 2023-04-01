import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "./shared/services/auth.service";
import {UserService} from "./shared/services/user.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'bookworm-webkert2023';
    loggedInUser?: firebase.default.User | null;

    constructor(private router: Router, private authService: AuthService, private userService: UserService) {
    }

    ngOnInit() {
        this.authService.isUserLoggedIn().subscribe(user => {
            this.loggedInUser = user;
            localStorage.setItem('user', JSON.stringify(user));
        }, error => {
            console.error(error);
            localStorage.setItem('user', JSON.stringify('null'));
            localStorage.setItem('cred', JSON.stringify('null'));
        })
    }
}
