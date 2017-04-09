//Modules
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { BugRoutingModule } from './bug-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
                      
//Component
import { BugListComponent } from './bug-list/bug-list.component';
import { NotFoundCompoent } from '../not-found.component';
import { BugDetailComponent } from  './bug-detail/bug-detail.component';

//services

import { BugService } from './service/bug.service';


@NgModule({
    imports: [ 
        SharedModule,
        BugRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [         // declare components, pipes etc
        BugListComponent,
        NotFoundCompoent,
        BugDetailComponent
    ],       
    exports: [],            // allow you to use a passthrough for modules 
    providers: [BugService]           // these are the services 

})

export class BugModule { }



