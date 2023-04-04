import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UploadBookRoutingModule} from './upload-book-routing.module';
import {UploadBookComponent} from './upload-book.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
    declarations: [
        UploadBookComponent
    ],
    imports: [
        CommonModule,
        UploadBookRoutingModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatButtonModule,
        FormsModule,
    ],
    providers: [
        {provide: MAT_DATE_LOCALE, useValue: 'en-GB'}
    ]
})
export class UploadBookModule {
}
