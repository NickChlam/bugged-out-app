import { Component, OnInit } from '@angular/core';
import { BugService } from '../service/bug.service';

@Component({
    moduleId: module.id,
    selector: 'bug-list',
    templateUrl: 'bug-list.component.html',
    styleUrls: ['bug-list.component.css']

})

export class BugListComponent implements OnInit {
    //set up subscruption to the method in bugservice

    constructor(private BugService: BugService) { }

    ngOnInit() {
        this.getAddedBugs();
    }

    getAddedBugs() {
        this.BugService.getAddedBugs()
        .subscribe(bug => {
            console.log(bug);
        },
        err => {
            console.error("Unable to get aded bug - ", err)
        })
    }
}
