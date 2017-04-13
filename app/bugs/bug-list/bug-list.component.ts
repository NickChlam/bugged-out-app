import { Component, OnInit } from '@angular/core';
import { BugService } from '../service/bug.service';
import { BugDetailComponent } from '../bug-detail/bug-detail.component';

import { Bug } from '../model/bug';

@Component({
    moduleId: module.id,
    selector: 'bug-list',
    templateUrl: 'bug-list.component.html',
    styleUrls: ['bug-list.component.css']

})

export class BugListComponent implements OnInit {

    private bugs: Bug[] = []; // create an empty array of Bug

    //set up subscruption to the method in bugservice
    constructor(private BugService: BugService) { }

    ngOnInit() {
        this.getAddedBugs();
        this.getUpdatedBugs();
        this.getDeletedBugs();
       
      
    }

    getAddedBugs() {
        this.BugService.getAddedBugs()
        .subscribe(bug => {
            this.bugs.push(bug);
        },
        err => {
            console.error("Unable to get aded bug - ", err)
        })
    }
   
    getUpdatedBugs() {
        this.BugService.changedListener()
            .subscribe(updatedBug => {
                // some magic to find where the index is 
                //get the array index of the bug that matches the updated bug based on id
                //map the array - iterates the array returns everything it finds 
                // put a con
                const bugIndex = this.bugs
                    .map(index => index.id )
                    .indexOf(updatedBug['id']);
                this.bugs[bugIndex] = updatedBug;
                console.log(updatedBug['id']); // TODO: Remove 
            },
            err => {
                 console.error("unable to get updated bug - ", err);

            });
    }
    getDeletedBugs() {
        this.BugService.deletedListener()
            .subscribe(deletedBug => {
                const bugIndex = this.bugs
                    .map(index => index.id )
                    .indexOf(deletedBug['id']);
                this.bugs.splice(bugIndex ,1);
                console.log(deletedBug['title']);  // TODO: REMOVE 
            },
            err => {
                 console.error("unable to get deleted bug - ", err);

            });
    }


}
