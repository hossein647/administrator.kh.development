import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LoginResolver } from './login/login.resolver';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'login', 
    pathMatch:'full'
  },
  { 
    path: 'dashboard', 
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  { 
    path: 'login', 
    component: LoginComponent, 
    resolve: { 'hasCookie': LoginResolver }, 
    data: { route: 'login'}
  },
  { 
    path: '**', 
    component: NotFoundComponent 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
