import { Component, Input, Output, ElementRef, EventEmitter, AfterViewInit } from '@angular/core';


declare var $: any;

@Component({
  //selector: 'modal',
  templateUrl: 'src/views/modal.html',
})
export class Modal implements AfterViewInit {

    // @Input() title:string;
    // @Input() showClose:boolean = true;
     @Output() onClose: EventEmitter<any> = new EventEmitter();

    modalElement = null;
    id: string = 'modal_of_dialog_host';

    constructor(){    }

    open() {
        console.log("open dialog");
        this.modalElement.modal('show');        
    }

    close() {
        console.log("close dialog");
        this.modalElement.modal('hide');
    }

    closeInternal() {
        this.onClose.next(null); 
        this.close();
    }

    ngAfterViewInit():void {
        this.modalElement = $('#'+this.id);
        console.log(this.modalElement);
    }

   
}

