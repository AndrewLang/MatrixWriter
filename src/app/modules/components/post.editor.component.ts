import {Component, OnInit}          from '@angular/core';

import * as Common                  from '../../common/index';
import * as Services                from '../services/index';
import {Modal}                      from './modal.component';

@Component({
    selector: 'app',
    templateUrl: 'src/views/post-editor.html',    
    providers: [Services.DataService, Services.MetaweblogService, Services.HtmlEditorService, Modal]
})
export class PostEditorComponent implements OnInit {
    Post: Common.Post = new Common.Post();
    private mContentChanged: any;
    mModal = null;

    constructor(private dataService: Services.DataService,
        private metaWeblogService: Services.MetaweblogService,
        private editorService: Services.HtmlEditorService,
        private dialogService: Services.DialogService) {

        console.log('constructor of post editor Component');
    }

    bindModal(modal):void{
        this.mModal = modal;
    }
     open(client) {
        this.mModal.open();
        console.log({client});
    }

    close() {
        this.mModal.close();
    }


    ngOnInit(): any {
        this.editorService.InitializeEditor("div.htmlEditor");
        this.mContentChanged = this.editorService
            .ContentChanged
            .subscribe(value => this.Post.Description = value);
    }

    Publish(): void {
        console.log("publishing post to ");
        this.editorService.UpdateContent();
        console.log(this.Post);
        this.dialogService.ShowDialog("address");

        this.mModal.open();
    }
}
