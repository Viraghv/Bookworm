import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {AdminComponent} from './admin.component';
import {UsersComponent} from './users/users.component';
import {BooksComponent} from './books/books.component';
import {OrdersComponent} from './orders/orders.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MatTableModule} from "@angular/material/table";
import {BooksModule} from "../books/books.module";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";


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
        MatTabsModule,
        MatTableModule,
        BooksModule,
        MatIconModule,
        MatButtonModule
    ]
})
export class AdminModule {
}
