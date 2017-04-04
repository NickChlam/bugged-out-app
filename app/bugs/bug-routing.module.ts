import { NgModule }         from '@angular/core';
import { RouterModule, Routes }     from '@angular/router';


import { BugListComponent } from './bug-list/bug-list.component';
import {  NotFoundCompoent } from '../not-found.component';

const appRoutes: Routes = [
            { path: '', redirectTo: 'bugs', pathMatch: 'full'},
            { path: 'bugs', component: BugListComponent},
            { path: '**', component: NotFoundCompoent }
]

@NgModule   ({
    imports: [
        RouterModule.forChild(appRoutes)
             //wildcard at bottom finds match in order
                                           
    ],      
    exports:  [RouterModule]
})

export class BugRoutingModule {}