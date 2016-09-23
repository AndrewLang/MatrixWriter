import {Component, OnInit, AfterViewInit }          from '@angular/core';

import * as Common                  from '../../common/index';
import * as Services                from '../services/index';
import {PostPublishComponent}       from './post.publish.component';


@Component({
    templateUrl: 'src/views/post-editor.html',
    providers: [Services.DataService, Services.MetaweblogService, Services.HtmlEditorService]
})
export class PostEditorComponent implements OnInit {
    
    PostFile : Common.PostFile = new Common.PostFile();
    private mContentChanged: any;

    constructor(private dataService: Services.DataService,
        private metaWeblogService: Services.MetaweblogService,
        private editorService: Services.HtmlEditorService,
        private dialogService: Services.DialogService,
        private postManageService: Services.PostManageService) {    }

    ngOnInit(): any {
        this.editorService.InitializeEditor("div.htmlEditor");

        this.mContentChanged = this.editorService
            .ContentChanged
            .subscribe(value => this.PostFile.Post.Description = value);

        this.postManageService.CurrentPost = this.PostFile;
    }

    Publish(): void {
        this.editorService.UpdateContent();
        this.dialogService.ShowDialog(PostPublishComponent);
    }
}
