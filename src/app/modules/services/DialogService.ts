import { Injectable} from '@angular/core';


@Injectable()
export class DialogService{

    ShowDialog( url:string ):void{
        console.log( url );
    }
}