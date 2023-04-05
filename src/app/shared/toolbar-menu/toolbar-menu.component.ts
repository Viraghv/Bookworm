import {Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {User} from "../models/User";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {firstValueFrom, Subscription} from "rxjs";

@Component({
    selector: 'app-toolbar-menu',
    templateUrl: './toolbar-menu.component.html',
    styleUrls: ['./toolbar-menu.component.scss']
})
export class ToolbarMenuComponent implements OnChanges {
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

    onToggleSidenav() {
        this.sidenav?.toggle();
    }

    logout() {
        this.authService.logout().then(() => {
            localStorage.setItem('user', JSON.stringify('null'));
            localStorage.setItem('cred', JSON.stringify('null'));
            this.username = "";
            this.admin = undefined;
            this.router.navigateByUrl('/books');
        }).catch(error => {
            console.error(error);
        });
    }

    navigateToCart() {
        this.router.navigateByUrl('/shopping-cart');
    }

}
