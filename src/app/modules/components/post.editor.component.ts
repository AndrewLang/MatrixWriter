import {Component, OnInit, AfterViewInit }          from '@angular/core';

import * as Common                  from '../../common/index';
import * as Services                from '../services/index';
import {PostPublishComponent}       from './post.publish.component';


@Component({
    templateUrl: 'src/views/post-editor.html',
    providers: [Services.DataService, Services.MetaweblogService, Services.HtmlEditorService]
})
export class PostEditorComponent implements OnInit, AfterViewInit {
    Post: Common.Post = new Common.Post();
    private mContentChanged: any;
    mModal = null;

    constructor(private dataService: Services.DataService,
        private metaWeblogService: Services.MetaweblogService,
        private editorService: Services.HtmlEditorService,
        private dialogService: Services.DialogService,
        private postManageService: Services.PostManageService) {    }

    ngOnInit(): any {
        this.editorService.InitializeEditor("div.htmlEditor");
        this.mContentChanged = this.editorService
            .ContentChanged
            .subscribe(value => this.Post.Description = value);

        this.postManageService.CurrentPost = this.Post;
    }

    ngAfterViewInit(): void {

    }

    Publish(): void {
        this.editorService.UpdateContent();
        console.log(this.Post);
        this.dialogService.ShowDialog(PostPublishComponent);
    }
}
