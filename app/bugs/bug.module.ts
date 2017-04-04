//Modules
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { BugRoutingModule } from './bug-routing.module';
                      
//Component
import { BugListComponent } from './bug-list/bug-list.component';


@NgModule({
    imports: [ 
        SharedModule,
        BugRoutingModule
    ],
    declarations: [         // declare components, pipes etc
        BugListComponent
    ],       
    exports: [],            // allow you to use a passthrough for modules 
    providers: []           // these are the services 

})

export class BugModule { }



