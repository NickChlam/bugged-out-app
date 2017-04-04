import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BugListComponent } from './bug-list/bug-list.component';

@NgModule   ({
    imports: [
        RouterModule.forChild([
            { path: '', redirectTo: 'bugs', pathMatch: 'full'},
            { path: 'bugs', component: BugListComponent},
            { path: '**', redirectTo: 'bugs' } //wildcard at bottom finds match in order
        ])                                              
    ],      
    exports:  [RouterModule]
})

export class BugRoutingModule {}