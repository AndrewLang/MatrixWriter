import {Component, Input, Output, EventEmitter, OnInit, AfterViewInit }          from '@angular/core';

import * as Common                  from '../../common/index';
import * as Services                from '../services/index';
import {ModalBase}                  from './ModalBase';


@Component({
    templateUrl: 'src/views/post-publish.html',
    providers: [Services.DataService, Services.MetaweblogService]
})
export class PostPublishComponent extends ModalBase {
    constructor() {
        super();
        console.log("publish component");
    }
    
}