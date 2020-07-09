import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EntryComponent } from './components/page/entry/entry.component';
import { ListComponent } from './components/page/list/list.component';
import { LoginPageComponent } from './components/page/login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/page/navbar/navbar.component'  
import {AuthGuard} from './AuthGuard';
import { TaskDetailComponent } from './components/page/task-detail/task-detail.component'
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { YesNoModalComponent } from './components/yes-no-modal/yes-no-modal.component';
import { Page404Component } from './components/page/page404/page404.component'
import {HTTP_INTERCEPTORS} from '@angular/common/http'
import {AddHeaderInterceptor} from './services/headerInterceptor';
import { RegisterComponent } from './components/page/register/register.component'
@NgModule({
  declarations: [
    AppComponent,
    EntryComponent,
    ListComponent,
    LoginPageComponent,
    NavbarComponent,
    TaskDetailComponent,
    YesNoModalComponent,
    Page404Component,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  entryComponents: [YesNoModalComponent],
  providers: [AuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: AddHeaderInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
