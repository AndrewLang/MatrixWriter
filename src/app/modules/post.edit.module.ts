import {NgModule}               from '@angular/core';
import {BrowserModule}          from '@angular/platform-browser';

import {PostEditorComponent}    from './components/post/post.editor.component';

@NgModule({
    imports: [BrowserModule],
    declarations: [PostEditorComponent],
    bootstrap: [PostEditorComponent]
})
export class PostEditModule { }