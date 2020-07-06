import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginPageComponent} from './components/page/login-page/login-page.component'
import {ListComponent} from './components/page/list/list.component'
const routes: Routes = [
  {path:'login', component:LoginPageComponent},
  {path:'tasks', component:ListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
