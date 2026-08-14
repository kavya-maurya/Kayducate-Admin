import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayout } from './layouts/admin-layout/admin-layout';
import { AuthLayout } from './layouts/auth-layout/auth-layout';



const routes: Routes = [
 


  

  {
    path: '',
    component: AuthLayout,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./features/auth/auth-module')
            .then(m => m.AuthModule)
      }
       
    ]
  },
  {
    path: 'admin',
    component: AdminLayout,
    loadChildren: () =>
      import('./features/admin/admin-module')
        .then(m => m.AdminModule)
  },

  

    

 
  {
    path: 'admin',
    component: AuthLayout,

    loadChildren: () =>
      import('./features/auth/auth-module')
        .then(m => m.AuthModule)
  },

  {
    path: '**',
    redirectTo: ''
  }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
