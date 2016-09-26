import { Injectable}                from '@angular/core';
import * as Common                  from '../../common/index';
import {KnownCommandNames}          from './KnownCommandNames';
import {CommandInitializer}         from './ICommandInitializer';

@Injectable()
export class EditorCommandInitializer extends CommandInitializer {
    constructor( commandRepository: Common.CommandRepository) {
        super(commandRepository);
    }

    InitializeCommands(): void {
        console.log("Start register command.");
        
        console.log("End register command. ");
        console.log(this.CommandRepository.Commands);
    }    
}