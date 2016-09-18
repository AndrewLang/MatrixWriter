import {Component, OnInit, OnDestroy}        from '@angular/core';
import { Router }                            from '@angular/router';
import * as Common                           from '../../common/index';
import * as Services                         from '../services/index';

@Component({
    selector: 'app',
    templateUrl: 'src/views/welcome.html',
    providers: [Services.SettingService]
})
export class WelcomeComponent implements OnInit, OnDestroy {

    constructor(private mRouter: Router, private mSettingService: Services.SettingService) {

    }

    ngOnInit() {
        this.mSettingService.SaveSettings();
        this.mSettingService.LoadSettings();
        console.log( this.mSettingService.Setting);
    }
    ngOnDestroy() {

    }

    CreatePost() {
        this.mRouter.navigate(['editor']);
    }
    OpenPost() {

    }
    CreateAccount() {
        this.mRouter.navigate(['createAccount']);
    }
}