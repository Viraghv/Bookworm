import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UploadBookComponent} from './upload-book.component';

const routes: Routes = [{path: '', component: UploadBookComponent}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UploadBookRoutingModule {
}
