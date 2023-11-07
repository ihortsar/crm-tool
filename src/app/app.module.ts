import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { UserComponent } from './user/user.component';
import { DashboardComponent } from './dashboard/dashboard.component'
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DialogAddUserComponent } from './dialog-add-user/dialog-add-user.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import { UserDetailComponent } from './user-detail/user-detail.component';
import {MatMenuModule} from '@angular/material/menu';
import { EditNameComponent } from './edit-name/edit-name.component';
import { EditAdressComponent } from './edit-adress/edit-adress.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    DashboardComponent,
    DialogAddUserComponent,
    UserDetailComponent,
    EditNameComponent,
    EditAdressComponent,
  ],
  imports: [

    MatMenuModule,
    MatProgressBarModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideFirebaseApp(() => initializeApp({"projectId":"simple-crm-9aa0c","appId":"1:714867174048:web:803b99e01811ee0e99f7c5","storageBucket":"simple-crm-9aa0c.appspot.com","apiKey":"AIzaSyCR3qBMOpNNjMT1MRU0ROWuCPwgG1-4iB0","authDomain":"simple-crm-9aa0c.firebaseapp.com","messagingSenderId":"714867174048"})),
    provideDatabase(() => getDatabase()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
