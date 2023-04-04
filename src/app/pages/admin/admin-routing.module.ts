import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from './admin.component';

const routes: Routes = [{path: '', component: AdminComponent},
    {
        path: 'upload-book/:id',
        loadChildren: () => import('./upload-book/upload-book.module').then(m => m.UploadBookModule)
    },
    {
        path: 'upload-book',
        loadChildren: () => import('./upload-book/upload-book.module').then(m => m.UploadBookModule)
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {
}
