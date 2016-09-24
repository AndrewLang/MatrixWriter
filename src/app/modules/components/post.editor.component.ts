import {Component, OnInit, AfterViewInit }          from '@angular/core';
import { Router, ActivatedRoute }                    from '@angular/router';

import * as Common                  from '../../common/index';
import * as Services                from '../services/index';
import {PostPublishComponent}       from './post.publish.component';


@Component({
    templateUrl: 'src/views/post-editor.html',
})
export class PostEditorComponent implements OnInit {

    PostFile: Common.PostFile = new Common.PostFile();
    private mContentChanged: any;

    constructor(private router: Router,
        private activeRoute: ActivatedRoute,
        private metaWeblogService: Services.MetaweblogService,
        private editorService: Services.HtmlEditorService,
        private dialogService: Services.DialogService,
        private postFileService: Services.PostFileService,
        private postManageService: Services.PostManageService) { }

    ngOnInit(): any {
        this.editorService.InitializeEditor("div.htmlEditor");

        let postFile: string;
        this.activeRoute.params.subscribe((param: any) => {
            postFile = param['file'];
            console.log(postFile);
        });

        if (postFile) {
            this.postFileService.Load(postFile)
                .then(data => this.PostFile = data)
                .catch(reason => console.log(reason));
        }

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
