import {NgModule}                           from '@angular/core';
import {BrowserModule}                      from '@angular/platform-browser';
import {Routes, RouterModule }              from '@angular/router';
import {Http, Headers,HttpModule}           from '@angular/http';

import {PostEditorComponent}                from './components/post/post.editor.component';
import {ErrorHandlingService}               from './services/ErrorHandlingService';
import {DataService}                        from './services/DataService';
import {HtmlEditorDirective}                from '../directives/HtmlEditorDirective';

@NgModule({
    imports: [BrowserModule,HttpModule],
    declarations: [PostEditorComponent,HtmlEditorDirective],
    providers:[ DataService, ErrorHandlingService ],
    bootstrap: [PostEditorComponent]
})
export class PostEditModule { }