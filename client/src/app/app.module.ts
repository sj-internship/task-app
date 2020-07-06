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
import {AuthGuard} from './AuthGuard'

@NgModule({
  declarations: [
    AppComponent,
    EntryComponent,
    ListComponent,
    LoginPageComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
