/*
*/
import { ModuleWithProviders }              from '@angular/core';
import { Routes, RouterModule }             from '@angular/router';

import { AppComponent }                     from './components/app.component';
import { WelcomeComponent }                 from './components/welcome.component';
import { PostEditorComponent }              from './components/post.editor.component';

const rootRoutes: Routes = [
    { path: '', redirectTo: '/welcome', pathMatch: 'full' },
    { path: 'welcome', component: WelcomeComponent },
    { path: 'editor', component: PostEditorComponent },
    { path: 'home', component : AppComponent}
];

const appRoutes: Routes = [
    ...rootRoutes
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);