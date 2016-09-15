import {Component, OnInit, OnDestroy}        from '@angular/core';
import { Router }                            from '@angular/router';

@Component({
    templateUrl:'src/views/account.create.html'
})
export class CreateAccountComponent{
    Title:string;
    CurrentStep: string;

    Next(): void {

    }
    Previous():void{

    }
}

export class ActionStep{
    Name: string;
    IsActive: boolean = false;
}
