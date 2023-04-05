import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../../shared/services/user.service";
import {User} from "../../../shared/models/User";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy{

    users: Array<User> = []
    usersSubscription?: Subscription;
    displayedColumns: string[] = ['id', 'email', 'username', 'admin', 'actionButtons']


    constructor(private userService: UserService) {
    }

    ngOnInit() {
        this.usersSubscription = this.userService.getAll().subscribe(users => {
            this.users = users;
        })
    }

    ngOnDestroy() {
        this.usersSubscription?.unsubscribe();
    }

    makeAdmin(user: User) {
        let adminUser: User = {
            id: user.id,
            email: user.email,
            username: user.username,
            admin: true,
        }

        this.userService.update(adminUser).catch(error => {
            console.error(error)
        });
    }

    revokeAdmin(user: User) {
        let notAdminUser: User = {
            id: user.id,
            email: user.email,
            username: user.username,
            admin: false,
        }

        this.userService.update(notAdminUser).catch(error => {
            console.error(error)
        });
    }
}
