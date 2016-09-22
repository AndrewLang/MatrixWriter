import {Component, Input, Output, EventEmitter, OnInit, AfterViewInit }          from '@angular/core';

import * as Common                  from '../../common/index';
import * as Services                from '../services/index';
import {ModalBase}                  from './ModalBase';


@Component({
    templateUrl: 'src/views/post-publish.html',
})
export class PostPublishComponent extends ModalBase implements OnInit {
    Status: string;

    constructor(private settingService: Services.SettingService,
    private postManageService:Services.PostManageService ) {
        super();
    }
    
    CanSubmit(): boolean{
        return false;
    }

    ngOnInit(): any {
        let post = this.postManageService.CurrentPost;
        this.Title = "Publish";
        this.Status =  "Publishing '" + post.Title + "' to blog '" + this.settingService.DefaultAccount.NickName + "'.";
    }

}