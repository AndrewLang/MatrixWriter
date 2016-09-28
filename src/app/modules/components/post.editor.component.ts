import {Component, OnInit, AfterViewInit }          from '@angular/core';
import {DomSanitizer, SafeHtml }                    from '@angular/platform-browser';
import { Router, ActivatedRoute }                   from '@angular/router';

import * as Common                  from '../../common/index';
import * as Services                from '../services/index';
import {PostPublishComponent}       from './post.publish.component';


@Component({
    templateUrl: 'src/views/post-editor.html',
})
export class PostEditorComponent implements OnInit {

    HtmlContent: SafeHtml;
    private mContentChanged: any;

    constructor(private router: Router,
        private sanitizer: DomSanitizer,
        private activeRoute: ActivatedRoute,
        private metaWeblogService: Services.MetaweblogService,
        private editorService: Services.HtmlEditorService,
        private dialogService: Services.DialogService,
        private postFileService: Services.PostFileService,
        private postManageService: Services.PostManageService,
        private electronEvent: Services.ElectronEventService) {
        console.log("constructor of post editor");
    }


    ngOnInit(): any {
        this.editorService.InitializeEditor("div.htmlEditor");

        let postFile: string;
        this.activeRoute.params.subscribe((param: any) => {
            postFile = param['file'];
            console.log(postFile);
        });

        if (postFile) {
            this.postFileService.Load(postFile)
                .then(data => {
                    this.postManageService.CurrentPost = data;
                    this.HtmlContent = this.postManageService.CurrentPost.Post.Description;
                })
                .catch(reason => console.log(reason));
        }

        this.mContentChanged = this.editorService
            .ContentChanged
            .subscribe(value => {
                this.postManageService.UpdatePostContent( value );
            });

        this.electronEvent.ShowMainMenu();
    }

    Publish(): void {
        this.editorService.UpdateContent();
        this.dialogService.ShowDialog(PostPublishComponent);
    }
}
