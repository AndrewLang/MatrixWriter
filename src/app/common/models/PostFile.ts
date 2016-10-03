import {Post}                   from './Post';
import {BlogInfo}               from './BlogInfo';
import {MediaObject}            from './MediaObject';
import {PostPublishHistory}     from './PostPublishHistory';

export class PostFile{
    static DefaultExtension = ".mpost";
    
    PostTitle: string;
    CreatedDate: string;

    
    BlogInfo : BlogInfo;
    Post:Post = new Post();
    MediaObjects:MediaObject[] = [];
    History: PostPublishHistory[] = [];

    IsPublished():boolean{
        return this.History != null && this.History.length > 0; 
    }
}