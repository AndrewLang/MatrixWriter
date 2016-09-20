import { Injectable, ViewContainerRef } from '@angular/core';

declare var $: any;

@Injectable()
export class DialogService{

    /**
     *
     */
    constructor(private viewContainer:ViewContainerRef ) {        
        
    }

    ShowDialog( url:string ):void{
        console.log( url );
        
    }
}