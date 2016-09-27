import { Injectable}                from '@angular/core';
import * as Common                  from '../../common/index';
import {KnownCommandNames}          from './KnownCommandNames';
import {CommandInitializer}         from './ICommandInitializer';

@Injectable()
export class PostCommandInitizlizer extends CommandInitializer{
    constructor( commandRepository: Common.CommandRepository) {
        super(commandRepository);
    }

    InitializeCommands(): void {
        console.log("Start register command.");
        this.RegisterCommand(KnownCommandNames.NewPost, (param) => { console.log("create post"); });
        this.RegisterCommand(KnownCommandNames.OpenLocalPost, (param) => { });
        this.RegisterCommand(KnownCommandNames.SavePost, (param) => { });
        

        console.log("End register command. ");
        console.log(this.CommandRepository.Commands);
    }  
}