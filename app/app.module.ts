// MODULE
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BugModule } from './bugs/bug.module';
import { AppRoutingModule } from  './app-routing.module';
import { RouterModule } from '@angular/router';
import { CoreModule } from './core/core.module';



import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';



@NgModule({
    imports: [ 
        BrowserModule,
        BugModule,
        AppRoutingModule,
        CoreModule.forRoot(),
        RouterModule                                                                                       
         ],
    declarations: [  
        AppComponent,
         NavbarComponent
         ],
    bootstrap: [ AppComponent]
})

export class AppModule { }


