import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {AdminComponent} from './admin.component';
import {UsersComponent} from './users/users.component';
import {BooksComponent} from './books/books.component';
import {OrdersComponent} from './orders/orders.component';
import {MatTabsModule} from "@angular/material/tabs";


@NgModule({
    declarations: [
        AdminComponent,
        UsersComponent,
        BooksComponent,
        OrdersComponent
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        MatTabsModule
    ]
})
export class AdminModule {
}
