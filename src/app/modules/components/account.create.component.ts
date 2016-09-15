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
    CanGoNext():boolean{
        return true;
    }
    Previous():void{

    }
    CanGoPrevious(): boolean{
        return true;
    }
    Finish():void{

    }
    
}

export class ActionStep{
    Name: string;
    IsActive: boolean = false;
}
