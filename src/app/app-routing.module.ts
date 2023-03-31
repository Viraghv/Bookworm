import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: 'login',
        loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
    },
    {
        path: 'signup', loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupModule)
    },
    {
        path: 'books', loadChildren: () => import('./pages/books/books.module').then(m => m.BooksModule)
    },
    {
        path: '**',
        redirectTo: '/books'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
