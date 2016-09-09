import {NgModule}               from '@angular/core';
import {BrowserModule}          from '@angular/platform-browser';
import { Routes, RouterModule }             from '@angular/router';
import {Http, Headers,HTTP_PROVIDERS}       from '@angular/http';

import {PostEditorComponent}    from './components/post/post.editor.component';
import {ErrorHandlingService}               from './services/ErrorHandlingService';
import {DataService}                        from './services/DataService';

@NgModule({
    imports: [BrowserModule],
    declarations: [PostEditorComponent],
    providers:[ DataService, ErrorHandlingService,HTTP_PROVIDERS ],
    bootstrap: [PostEditorComponent]
})
export class PostEditModule { }