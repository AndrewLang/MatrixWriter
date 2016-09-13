import {CategoryInfo} from './CategoryInfo';

export class Post{
    DateCreated: Date;
    DateCreatedGmt: Date;
    Description : string;
    Title : string;
    Slug:string;
    PostFormat: string;
    Categories: string[];
    Link: string;
    PermaLink:string;
    PostId: string;
    Source: string;
    UserId: string;
    AllowCommants: boolean;
    AllowPings:boolean;
    ConvertBreaks: boolean;
    Sticky: boolean;
    Publish: boolean;
    Excerpt: string;
}