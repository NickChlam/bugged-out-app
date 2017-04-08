import { Component, OnInit } from '@angular/core';
import { BugService } from '../service/bug.service';

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
    }

    getAddedBugs() {
        this.BugService.getAddedBugs()
        .subscribe(bug => {
            this.bugs.push(bug);
            console.log(this.bugs);       // TODO: REMOVE
        },
        err => {
            console.error("Unable to get aded bug - ", err)
        })
    }
}
