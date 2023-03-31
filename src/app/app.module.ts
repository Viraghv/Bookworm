import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {environment} from '../environments/environment';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {provideAuth, getAuth} from '@angular/fire/auth';
import {provideFirestore, getFirestore} from '@angular/fire/firestore';
import {provideStorage, getStorage} from '@angular/fire/storage';
import {AngularFireModule} from "@angular/fire/compat";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSidenavModule} from "@angular/material/sidenav";
import {ToolbarMenuComponent} from './shared/toolbar-menu/toolbar-menu.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatBadgeModule} from "@angular/material/badge";
import {MatListModule} from "@angular/material/list";
import {SidenavMenuComponent} from './shared/sidenav-menu/sidenav-menu.component';

@NgModule({
    declarations: [
        AppComponent,
        ToolbarMenuComponent,
        SidenavMenuComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebase),
        // provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
        provideStorage(() => getStorage()),
        BrowserAnimationsModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatBadgeModule,
        MatListModule,

    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
