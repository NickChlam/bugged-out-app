import { Injectable } from '@angular/core';

import { Observable  } from 'rxjs/Observable';

import { FirebaseConfigService } from '../../core/service/firebase-config.service';


@Injectable()

export class BugService {

    private bugsDBRef = this.fire.database.ref('/bugs');  // points to root database

    constructor(private fire: FirebaseConfigService) {}

    //create a method that will listen for child added - get initial list of data
    // use it to keep watching for added children

    getAddedBugs(): Observable<any> {
        return Observable.create(obs => {
            this.bugsDBRef.on('child_added', bug => {
                obs.next(bug.val()); //extracts the content of the snapshot creates JS object
            },
            err => {
                obs.throw(err);
            });
        });

    }
}

