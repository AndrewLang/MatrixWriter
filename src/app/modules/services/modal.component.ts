import { Component, Input, Output, ElementRef, EventEmitter, AfterViewInit, OnInit } from '@angular/core';


declare var $: any;

@Component({
    //selector: 'modal',
    templateUrl: 'src/views/modal.html',
})
export class Modal implements OnInit, AfterViewInit {

    // @Input() title:string;
    // @Input() showClose:boolean = true;
    @Output() onClose: EventEmitter<any> = new EventEmitter();

    modalElement = null;
    id: string = 'modal_of_dialog_host';

    constructor(private rotNode: ElementRef) { 
        this.modalElement = $(this.rotNode.nativeElement).find('div#modal_of_dialog_host');// $('#'+this.id);
        console.log("Modal constructor");
        console.log(this.modalElement.id);
        console.log(this.modalElement);
    }

    open() {
        console.log("open dialog");
        //this.modalElement.modal('show');
        $('#modal_of_dialog_host').modal('show');
    }

    close() {
        console.log("close dialog");
        this.modalElement.modal('hide');
    }

    closeInternal() {
        this.onClose.next(null);
        this.close();
    }
    ngOnInit(): any {
         
    }
    ngAfterViewInit(): void {
       
    }


}

