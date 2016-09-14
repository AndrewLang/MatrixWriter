import {NgModule}                           from '@angular/core';
import {BrowserModule}                      from '@angular/platform-browser';
import {Routes, RouterModule }              from '@angular/router';
import {Http, Headers,HttpModule}           from '@angular/http';

import { AppComponent}                      from './components/app.component';
import { WelcomeComponent }                 from './components/welcome.component';
import { PostEditorComponent}               from './components/post.editor.component';
import { ErrorHandlingService}              from './services/ErrorHandlingService';
import { DataService}                       from './services/DataService';
import { HtmlEditorDirective}               from '../directives/HtmlEditorDirective';
import { MetaweblogService}                 from './services/MetaweblogService';
import { DialogService}                     from './services/DialogService';
import { HtmlEditorService}                 from './services/HtmlEditorService';
import { routing, appRoutingProviders }     from './app.routing';

@NgModule({
    imports: [BrowserModule,HttpModule,routing],
    declarations: [AppComponent,WelcomeComponent,PostEditorComponent,HtmlEditorDirective],
    providers:[ DataService, ErrorHandlingService, MetaweblogService,appRoutingProviders,DialogService],
    bootstrap: [AppComponent]
})
export class AppModule { }