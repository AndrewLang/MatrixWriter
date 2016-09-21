
import{Input, Output, EventEmitter} from '@angular/core';

import * as Common                  from '../../common/index';

declare var $: any;

export abstract class ModalBase implements Common.IModalView {
    private id: string = 'modal_of_dialog_host';
    @Output() OnClose: EventEmitter<any> = new EventEmitter();
    Title:string;
    LabelCancel:string = "Cancel";
    LabelSubmit: string = "OK";

    Open(): void{
        console.log("open dialog");
        console.log( this.getHostId() );
        this.getHostId().modal({backdrop:'static', show:true});
    }
    Close(): void{
        console.log("close dialog");
        this.getHostId().modal('hide');
    }
    CanClose():boolean{
        return true;
    }
    Cancel():void{
        // Close the dialog directly
        this.CloseInternal();
    }
    Submit():void{
        this.CloseInternal();
    }
    CanSubmit():boolean{
        return true;
    }
    private CloseInternal() {
        this.OnClose.next(null);
        this.Close();
    }
    private getHostId(): any {
        return $('#' + this.id);
    }
}