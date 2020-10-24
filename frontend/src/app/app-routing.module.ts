import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'upload',
        pathMatch: 'full'
    },
    {
        path: 'upload',
        loadChildren: () => import('./file-upload/file-upload.module').then(m => m.FileUploadModule),
    }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
