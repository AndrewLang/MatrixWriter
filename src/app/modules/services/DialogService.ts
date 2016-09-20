import { Injectable} from '@angular/core';

declare var $: any;

@Injectable()
export class DialogService{

    ShowDialog( url:string ):void{
        console.log( url );
    }
}