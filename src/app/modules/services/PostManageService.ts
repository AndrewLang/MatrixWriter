import {Injectable}         from '@angular/core';
import * as Common                  from '../../common/index';

@Injectable()
export class PostManageService{
    private mCurrentPost : Common.Post;

    get CurrentPost(): Common.Post{
        return this.mCurrentPost;
    }
    set CurrentPost( value: Common.Post ){
        this.mCurrentPost = value;
    }
}