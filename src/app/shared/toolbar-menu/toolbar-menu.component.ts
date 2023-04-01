import {Component, Input, OnChanges} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {User} from "../models/User";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";

@Component({
    selector: 'app-toolbar-menu',
    templateUrl: './toolbar-menu.component.html',
    styleUrls: ['./toolbar-menu.component.scss']
})
export class ToolbarMenuComponent implements OnChanges {
    @Input() user?: firebase.default.User | null;
    @Input() sidenav: MatSidenav | undefined;

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

    onToggleSidenav() {
        this.sidenav?.toggle();
    }

    logout() {
        this.authService.logout().then(() => {
            console.log('Logged out successfully.');
            localStorage.setItem('cred', JSON.stringify('null'));
            this.router.navigateByUrl('/books');
        }).catch(error => {
            console.error(error);
        });
    }
}
