import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginPageComponent} from './components/page/login-page/login-page.component'
import {ListComponent} from './components/page/list/list.component'
import {AuthGuard} from './AuthGuard'
const routes: Routes = [
  {path:'login', component:LoginPageComponent},
  {path:'tasks', component:ListComponent, canActivate:[AuthGuard]},
  {path:'tasks/:id', },
  {path:'**', redirectTo:'tasks'}, //TODO 404 page
  {path:'', pathMatch:'full', redirectTo:'tasks'},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
