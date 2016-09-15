import {NgModule}                           from '@angular/core';
import {BrowserModule}                      from '@angular/platform-browser';
import {Routes, RouterModule }              from '@angular/router';
import {Http, Headers,HttpModule}           from '@angular/http';

import *  as Components                     from './components/index';
import *  as Services                       from './services/index';
import { routing, appRoutingProviders }     from './app.routing';

@NgModule({
    imports: [BrowserModule,HttpModule,routing],
    declarations: [Components.AppComponent,Components.WelcomeComponent,Components.PostEditorComponent, Components.CreateAccountComponent],
    providers:[ Services.DataService, Services.ErrorHandlingService, Services.MetaweblogService,appRoutingProviders,Services.DialogService],
    bootstrap: [Components.AppComponent]
})
export class AppModule { }