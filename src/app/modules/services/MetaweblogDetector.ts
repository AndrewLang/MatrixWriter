import {Blog}           from './Blog';
import {BlogAccount}    from './BlogAccount'
import {IBlogDetector}  from './IBlogDetector';

export class MetaweblogDetector implements IBlogDetector{

    Detect(account:BlogAccount):Array<Blog>{
        let blogs :Array<Blog> = [];


        return blogs;
    }
}