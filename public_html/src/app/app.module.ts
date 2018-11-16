import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatPaginatorModule, MatProgressSpinnerModule,
         MatSortModule, MatTableModule } from "@angular/material";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';

import { MapComponent } from './map/map.component';
import { MapInputComponent } from './map/map-input/map-input.component';
import { MapDisplayComponent } from './map/map-display/map-display.component';

import { AgmCoreModule } from '@agm/core';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';

import { CabidaDataService } from './shared/cabida-data.service';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth-guard.service';


import { HttpClientModule } from '@angular/common/http';

import { MaplatlngService } from './map/maplatlng.service';


import { BackendComponent } from './backend/backend.component';
import { CorridaComponent } from './backend/corrida/corrida.component';
import { PropiedadesComponent } from './backend/propiedades/propiedades.component';

import { AppRoutingModule } from './app-routing.module';
import { MainEditComponent } from './backend/corrida/main-edit/main-edit.component';
import { CabidaEditComponent } from './backend/corrida/cabida-edit/cabida-edit.component';
import { CorridaEditComponent } from './backend/corrida/corrida-edit/corrida-edit.component';
import { CabidaTableComponent } from './backend/corrida/tables/cabida-table/cabida-table.component';
import { TablesComponent } from './backend/corrida/tables/tables.component';
import { CorridaTableComponent } from './backend/corrida/tables/corrida-table/corrida-table.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';

import { environment } from '../environments/environment';





@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    MapInputComponent,
    MapDisplayComponent,
    BackendComponent,
    CorridaComponent,
    PropiedadesComponent,
    MainEditComponent,
    CabidaEditComponent,
    CorridaEditComponent,
    CabidaTableComponent,
    TablesComponent,
    CorridaTableComponent,
    SigninComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot(
      environment.agm
    ),
    GooglePlaceModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule
  ],
  providers: [
    CabidaDataService,
    MaplatlngService,
    AuthService,
    AuthGuard

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
