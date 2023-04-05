import {Component, Input, OnChanges} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {User} from "../models/User";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {UserService} from "../services/user.service";
import {firstValueFrom} from "rxjs";

@Component({
    selector: 'app-sidenav-menu',
    templateUrl: './sidenav-menu.component.html',
    styleUrls: ['./sidenav-menu.component.scss']
})
export class SidenavMenuComponent implements OnChanges {
    @Input() loggedUser?: firebase.default.User | null;
    @Input() sidenav: MatSidenav | undefined;
    @Input() cartNumber: number = 0;

    username?: string;
    admin?: boolean;

    constructor(private router: Router, private authService: AuthService, private userService: UserService) {
    }

    async ngOnChanges() {
        if (this.loggedUser) {
            let source = this.userService.getById(this.loggedUser.uid)
            const userData = await firstValueFrom(source)
            this.username = userData?.username;
            this.admin = userData?.admin;
        }
    }

    logout() {
        this.authService.logout().then(() => {
            localStorage.setItem('user', JSON.stringify('null'));
            localStorage.setItem('cred', JSON.stringify('null'));
            this.username = "";
            this.admin = undefined;
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
