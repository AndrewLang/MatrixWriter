import { Injectable, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import {ComponentCreator}   from './ComponentCreator';
import {Modal}              from './modal.component';

declare var $: any;

@Injectable()
export class DialogService {

   
    constructor(private mComponentCreator: ComponentCreator) {

    }

    ShowDialog(type: String): void {
        console.log(type);

        let factory = this.mComponentCreator.ComponentFactoryResolver.resolveComponentFactory(Modal);
        let component = this.mComponentCreator.ViewContainer.createComponent(factory);

        component.instance.open();
    }
}