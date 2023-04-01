import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BooksRoutingModule} from './books-routing.module';
import {BooksComponent} from './books.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {CardComponent} from "./card/card.component";
import {DateFormatPipe} from "../../shared/pipes/date-format.pipe";
import {FormsModule} from "@angular/forms";


@NgModule({
    declarations: [
        BooksComponent,
        CardComponent,
        DateFormatPipe
    ],
    imports: [
        CommonModule,
        BooksRoutingModule,
        MatCardModule,
        MatButtonModule,
        MatInputModule,
        FormsModule,
    ]
})
export class BooksModule {
}
