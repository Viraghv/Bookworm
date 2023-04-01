import {Component, Input, OnChanges} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {User} from "../models/User";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {UserService} from "../services/user.service";

@Component({
    selector: 'app-sidenav-menu',
    templateUrl: './sidenav-menu.component.html',
    styleUrls: ['./sidenav-menu.component.scss']
})
export class SidenavMenuComponent implements OnChanges {
    @Input() user?: firebase.default.User | null;
    @Input() sidenav: MatSidenav | undefined;
    @Input() cartNumber: number = 0;

    username?: string;
    admin?: boolean;

    constructor(private router: Router, private authService: AuthService, private userService: UserService) {
    }

    ngOnChanges() {
        if (this.user) {
            this.userService.getById(this.user?.uid).subscribe(user => {
                this.username = user?.username;
                this.admin = user?.admin;
            });
        }
    }

    logout() {
        this.authService.logout().then(() => {
            console.log('Logged out successfully.');
            localStorage.setItem('cred', JSON.stringify('null'));
            this.closeSideNav();
            this.router.navigateByUrl('/books');
        }).catch(error => {
            console.error(error);
        });
    }

    closeSideNav() {
        this.sidenav?.close();
    }
}
