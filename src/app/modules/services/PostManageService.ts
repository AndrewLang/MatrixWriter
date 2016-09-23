import {Injectable}         from '@angular/core';
import * as Common          from '../../common/index';

@Injectable()
export class PostManageService{
    private mCurrentPost : Common.PostFile;

    get CurrentPost(): Common.PostFile{
        return this.mCurrentPost;
    }
    set CurrentPost( value: Common.PostFile ){
        this.mCurrentPost = value;
    }
}