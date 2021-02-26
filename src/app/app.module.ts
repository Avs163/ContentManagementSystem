import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { AppComponent } from './app.component';
import {MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { DropDownButtonModule, SplitButtonModule, ProgressButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button'
import {MatListModule} from '@angular/material/list'
import {MatSidenavModule} from '@angular/material/sidenav'
import {MatIconModule} from '@angular/material/icon'
import {MatToolbarModule} from '@angular/material/toolbar'
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { CalenderComponent } from './calender/calender.component';
import { AgendaService, DayService, MonthAgendaService, MonthService, ScheduleModule, TimelineMonthService, TimelineViewsService, WeekService, WorkWeekService } from '@syncfusion/ej2-angular-schedule';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TaskComponent } from './task/task.component';
import { CasesComponent } from './cases/cases.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SplitterModule } from '@syncfusion/ej2-angular-layouts';
import { CheckBoxModule,ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { DropDownListAllModule, MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';
import { DatePickerAllModule } from '@syncfusion/ej2-angular-calendars';
import { ToolbarModule,TabModule } from '@syncfusion/ej2-angular-navigations';
import { NumericTextBoxAllModule,UploaderModule,TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { EditService, GridAllModule, ToolbarService } from '@syncfusion/ej2-angular-grids';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { KanbanModule } from '@syncfusion/ej2-angular-kanban';
import { TeamsComponent } from './teams/teams.component';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import {MatTabsModule} from '@angular/material/tabs'
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { CKEditorModule } from 'ckeditor4-angular';
import { SearchComponent } from './search/search.component';
import {MatMenuModule} from '@angular/material/menu';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ChatFormComponent } from './chat-form/chat-form.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { FeedComponent } from './feed/feed.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { MessageComponent } from './message/message.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { UserItemComponent } from './user-item/user-item.component';
import { UserListComponent } from './user-list/user-list.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthService } from './services/auth.service';
import { ChatService } from './services/chat.service';
import { LayoutComponent } from './layout/layout.component';
import { TestComponent } from './test/test.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TaskCreateComponent } from './task-create/task-create.component';
import { CaseCreateComponent } from './case-create/case-create.component';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    CalenderComponent,
    DashboardComponent,
    TaskComponent,
    CasesComponent,
    TeamsComponent,
    SearchComponent,
    ChatFormComponent,
    ChatroomComponent,
    FeedComponent,
    MessageComponent,
    LoginFormComponent,
    SignupFormComponent,
    NavbarComponent,
    UserListComponent,
    UserItemComponent,
    LayoutComponent,
    TestComponent,
    TaskCreateComponent,
    CaseCreateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDatepickerModule,
    BrowserAnimationsModule,
    MultiSelectModule,
    CommonModule,
    ButtonModule,
    KanbanModule,
    GridModule,
    HttpClientModule,
    PdfViewerModule,
    MatSelectModule,
    SplitterModule,
    MatToolbarModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    CKEditorModule,
    RichTextEditorAllModule,
    MatSidenavModule,
    MatListModule,
    TextBoxModule,
    MatButtonModule,
    MatCardModule,
    LayoutModule,
    MatInputModule,
    TabModule ,
    ScheduleModule,
    MatMenuModule,
    NgxExtendedPdfViewerModule,
    UploaderModule,
    ToolbarModule,
     GridAllModule,
     NumericTextBoxAllModule,
     DialogModule,
     DatePickerAllModule,
     DropDownListAllModule,
     ReactiveFormsModule,
     FormsModule,
     CheckBoxModule,
     MatTabsModule,
     DropDownButtonModule,
     SplitButtonModule,
     ProgressButtonModule,
     MatTableModule,
     MatProgressSpinnerModule,
     MatSortModule,
     MatSnackBarModule,
     AngularFireModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule

  ],
  providers: [AuthService, ChatService,DatePipe,EditService,ToolbarService,TaskComponent,DayService, WeekService, WorkWeekService, MonthService, AgendaService, MonthAgendaService, TimelineViewsService, TimelineMonthService],
  bootstrap: [AppComponent,TaskComponent]
})
export class AppModule { }
