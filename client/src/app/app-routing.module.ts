import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './components/page/login-page/login-page.component'
import { ListComponent } from './components/page/list/list.component'
import { AuthGuard } from './AuthGuard'
import { TaskDetailComponent } from './components/page/task-detail/task-detail.component'
import { Page404Component } from './components/page/page404/page404.component'
import { RegisterComponent } from './components/page/register/register.component'
const routes: Routes = [
    { path: 'login', component: LoginPageComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'tasks', component: ListComponent, canActivate: [AuthGuard] },
    { path: 'tasks/:id', component: TaskDetailComponent, canActivate: [AuthGuard] },
    { path: '**', component: Page404Component },
    { path: '', pathMatch: 'full', redirectTo: 'tasks' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
