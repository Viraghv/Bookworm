import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ShoppingCartRoutingModule} from './shopping-cart-routing.module';
import {ShoppingCartComponent} from './shopping-cart.component';
import {ShoppingCartItemComponent} from './shopping-cart-item/shopping-cart-item.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {BooksModule} from "../books/books.module";
import {MatSelectModule} from "@angular/material/select";
import {MatSnackBarModule} from "@angular/material/snack-bar";


@NgModule({
    declarations: [
        ShoppingCartComponent,
        ShoppingCartItemComponent,
    ],
    imports: [
        CommonModule,
        ShoppingCartRoutingModule,
        MatCardModule,
        MatButtonModule,
        FormsModule,
        MatInputModule,
        BooksModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatSnackBarModule
    ]
})
export class ShoppingCartModule {
}
