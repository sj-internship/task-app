import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { EntryComponent } from './components/page/entry/entry.component';
import { ListComponent } from './components/page/list/list.component';
import { LoginPageComponent } from './components/page/login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/page/navbar/navbar.component';
import { AuthGuard } from './AuthGuard';
import { TaskDetailComponent } from './components/page/task-detail/task-detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { YesNoModalComponent } from './components/yes-no-modal/yes-no-modal.component';
import { Page404Component } from './components/page/page404/page404.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './services/jwt-interceptor';
import { Select2Module } from 'ng2-select2';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { LoaderComponent } from './components/shared/loader/loader.component';
import { RegisterComponent } from './components/page/register/register.component';
import { LoaderService } from './services/loader.service';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { MatInputModule } from '@angular/material';
import {MatNativeDateModule} from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import { DeadlineCounterComponent } from './components/deadline-counter/deadline-counter.component';
import { SearchComponent } from './components/search/search.component';
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
        LoaderComponent,
        DatePickerComponent,
        DeadlineCounterComponent,
        SearchComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgbModule,
        Select2Module,
        MatProgressSpinnerModule,
        MatDatepickerModule,
        MatInputModule,
        MatNativeDateModule,
        BrowserAnimationsModule,
        MatFormFieldModule
    ],
    entryComponents: [YesNoModalComponent],
    providers: [AuthGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true,
        },
        LoaderService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
