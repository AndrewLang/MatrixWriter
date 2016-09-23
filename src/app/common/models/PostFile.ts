import {Post}           from './Post';
import {BlogInfo}       from './BlogInfo';
import {MediaObject}    from './MediaObject';

export class PostFile{
    static DefaultExtension = ".mpost";
    
    PostTitle: string;
    CreatedDate: string;

    IsPublished:boolean = false;
    BlogInfo : BlogInfo;
    Post:Post = new Post();
    MediaObjects:MediaObject[] = [];
}