import { Injectable, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';

declare var $: any;

@Injectable()
export class DialogService{

    /**
     *
     */
    constructor(private viewContainer:ViewContainerRef, private componentFactoryResolver ) {        
        
    }

    ShowDialog( url:string ):void{
        console.log( url );
        let factory = this.componentFactoryResolver.resolveComponentFactory();
        let componentRef = this.viewContainer.createComponent(factory);

        
    }
}