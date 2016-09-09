
import {Http, Headers} from '@angular/http';
import 'rxjs/Rx';

import {Blog}           from './Blog';
import {BlogAccount}    from './BlogAccount'
import {IBlogDetector}  from './IBlogDetector';
import {DataService}    from './DataService';

export class MetaweblogDetector implements IBlogDetector {

    constructor(private dataService: DataService) {

    }

    Detect(account: BlogAccount): Array<Blog> {
        let blogs: Array<Blog> = [];

        this.dataService.Get(account.HomeUrl, (response: any) => { 
            
        });

        return blogs;
    }
}