import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./shared/guards/auth.guard";
import {AdminAuthGuard} from "./shared/guards/admin-auth.guard";

const routes: Routes = [
    {
        path: 'login',
        loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
    },
    {
        path: 'signup',
        loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupModule)
    },
    {
        path: 'books',
        loadChildren: () => import('./pages/books/books.module').then(m => m.BooksModule)
    },
    {
        path: 'shopping-cart',
        loadChildren: () => import('./pages/shopping-cart/shopping-cart.module').then(m => m.ShoppingCartModule),
        canActivate: [AuthGuard],

    },
    {
        path: 'admin',
        loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule),
        canActivate: [AdminAuthGuard]
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
