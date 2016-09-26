import { Injectable}                from '@angular/core';
import * as Common                  from '../../common/index';
import {KnownCommandNames}          from './KnownCommandNames';
import {CommandInitializer}         from './ICommandInitializer';
import {HtmlEditorService}          from './HtmlEditorService';

@Injectable()
export class EditorCommandInitializer extends CommandInitializer {
    constructor( commandRepository: Common.CommandRepository,
    private htmlEditorService: HtmlEditorService) {
        super(commandRepository);
    }

    InitializeCommands(): void {
        console.log("Start register command.");
        
        this.RegisterCommand(KnownCommandNames.Bold, (param) => { this.htmlEditorService.ToggleBold(); });
        console.log("End register command. ");
        console.log(this.CommandRepository.Commands);
    }    
}