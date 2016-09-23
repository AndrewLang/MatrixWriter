
import { Injectable, EventEmitter } from '@angular/core';

declare var tinymce: any;

@Injectable()
export class HtmlEditorService{
    private mContent:string;
    ContentChanged :EventEmitter<string> = new EventEmitter<string>();

    get Content():string{
        return this.mContent;
    }
    set Content(value : string ){
        if( value != this.mContent){
            this.mContent = value;
            this.ContentChanged.emit( value );
        }
    }

    InitializeEditor( selector:string ):void {
        let self = this;
         tinymce.init({
            selector: selector,
            inline: true,
            fixed_toolbar_container: "div#textEditorToolbar",
            theme: 'modern',
            statusbar: false,
            menu: {
                file: { title: 'File', items: 'newdocument | print' },
                edit: { title: 'Edit', items: 'undo redo | cut copy paste pastetext | selectall ' },
                format: { title: 'Format', items: 'bold italic underline strikethrough superscript subscript | formats | removeformat' },
                insert: { title: 'Insert', items: 'link image media | emoticons codesample hr importcss insertdatetime | inserttable tableprops deletetable | cell row column | table template' },
                view: { title: 'View', items: 'visualaid visualblocks' },
                help: { title: 'Help', items: 'print' }
            },
            codesample_languages: [
                { text: 'HTML/XML', value: 'markup' },
                { text: 'JavaScript', value: 'javascript' },
                { text: 'CSS', value: 'css' },
                { text: 'PHP', value: 'php' },
                { text: 'Ruby', value: 'ruby' },
                { text: 'Python', value: 'python' },
                { text: 'Java', value: 'java' },
                { text: 'C', value: 'c' },
                { text: 'C#', value: 'csharp' },
                { text: 'C++', value: 'cpp' }
            ],
            menubar: false, // 'file edit format insert view help',
            plugins: [
                'advlist autolink lists link image charmap print preview hr anchor pagebreak',
                'searchreplace wordcount visualblocks visualchars code fullscreen',
                'insertdatetime media nonbreaking save table contextmenu directionality',
                'emoticons template paste textcolor colorpicker textpattern imagetools codesample bbcode',
                'importcss spellchecker template'
            ],
            toolbar1: 'undo redo | cut copy paste pastetext | styleselect | bold italic | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent',
            toolbar2: 'code print searchreplace | link image media |  emoticons codesample hr importcss insertdatetime table',
            content_css: [
                //'//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
                'src/assets/css/editor.basic.css'
            ],
            templates: [
                { title: 'Some title 1', description: 'Some desc 1', content: 'My content' },
                { title: 'Some title 2', description: 'Some desc 2', url: 'development.html' }
            ],
            textpattern_patterns: [
                { start: '*', end: '*', format: 'italic' },
                { start: '**', end: '**', format: 'bold' },
                { start: '#', format: 'h1' },
                { start: '##', format: 'h2' },
                { start: '###', format: 'h3' },
                { start: '####', format: 'h4' },
                { start: '#####', format: 'h5' },
                { start: '######', format: 'h6' },
                { start: '1. ', cmd: 'InsertOrderedList' },
                { start: '* ', cmd: 'InsertUnorderedList' },
                { start: '- ', cmd: 'InsertUnorderedList' }
            ],
            init_instance_callback: function (editor) {
                console.log("init callback");
                tinymce.activeEditor.focus();
            },
            setup: function (editor) {
                editor.on('init', function (e) {
                    console.log("html editor initialized.")
                });
                editor.on('blur', function (e) {
                    throw new Error('Tinymce hack workaround');
                });
                editor.on('change',function(e){
                    self.Content = editor.getContent({format : 'raw'});
                });
            }
        });
    }

    UpdateContent():void{
        
        this.Content = tinymce.activeEditor.getContent({format : 'raw'});
        
    }
}