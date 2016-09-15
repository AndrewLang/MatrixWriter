import {Component, OnInit, OnDestroy}        from '@angular/core';
import { Router }                            from '@angular/router';
import * as Common                           from '../../common/index';
import * as Services                         from '../services/index';

@Component({
    selector: 'app',
    templateUrl: 'src/views/welcome.html',
})
export class WelcomeComponent implements OnInit, OnDestroy {

    constructor(private mRouter:Router, private mDialogService: Services.DialogService) {

    }

    ngOnInit() {
       
    }
    ngOnDestroy() {

    }

    CreatePost(){        
        this.mRouter.navigate(['editor']);
    }
    OpenPost(){

    }
    CreateAccount(){
        //this.mDialogService.ShowDialog('src/views/new-account.html');
        this.mRouter.navigate(['createAccount']);
    }
}