import {NgModule}                           from '@angular/core';
import {BrowserModule}                      from '@angular/platform-browser';
import {Routes, RouterModule }              from '@angular/router';
import { JsonpModule,HttpModule}           from '@angular/http';
import { FormsModule }                      from '@angular/forms';

import *  as Components                     from './components/index';
import *  as Services                       from './services/index';
import { routing, appRoutingProviders }     from './app.routing';

@NgModule({
    imports: [BrowserModule,HttpModule,FormsModule,JsonpModule,routing],
    declarations: [Components.AppComponent,Components.WelcomeComponent,Components.PostEditorComponent, Components.CreateAccountComponent],
    providers:[ Services.DataService, Services.ErrorHandlingService, Services.MetaweblogService,appRoutingProviders,Services.DialogService],
    bootstrap: [Components.AppComponent]
})
export class AppModule { }