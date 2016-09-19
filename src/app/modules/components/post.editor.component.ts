import {Component, OnInit}          from '@angular/core';

import * as Common                  from '../../common/index';
import * as Services                from '../services/index';

@Component({
    selector: 'app',
    templateUrl: 'src/views/post-editor.html',
    providers: [Services.DataService, Services.MetaweblogService,Services.HtmlEditorService]
})
export class PostEditorComponent implements OnInit {
    postContent: string = "";

    constructor(private dataService: Services.DataService, 
        private metaWeblogService: Services.MetaweblogService,
        private editorService: Services.HtmlEditorService) {
            
        console.log('constructor of post editor Component');
    }


    ngOnInit(): any {
        this.editorService.InitializeEditor("div.htmlEditor");        
    }
}
