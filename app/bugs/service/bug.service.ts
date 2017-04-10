import { Injectable } from '@angular/core';

import { Observable  } from 'rxjs/Observable';

import { FirebaseConfigService } from '../../core/service/firebase-config.service';

import { Bug } from '../model/bug';


@Injectable()

export class BugService {
    
    
    private bugsDBRef = this.fire.database.ref('/bugs');  // points to root database
    
    constructor(private fire: FirebaseConfigService) {}

    //create a method that will listen for child added - get initial list of data
    // use it to keep watching for added children
    
    getAddedBugs(): Observable<any> {
        return Observable.create(obs => {
            this.bugsDBRef.on('child_added', bug => {
                const newBug = bug.val() as Bug;
                newBug.id = bug.key;
                obs.next(newBug); //extracts the content of the snapshot creates JS object but we cast our bug object from above
            },
            err => {
                obs.throw(err); 
            });
        });   
    } // end getAddedBugs
   
    changedListener(): Observable<any> {
        return Observable.create(obs => {
            this.bugsDBRef.on('child_changed', bug => {
                const updatedBug = bug.val() as Bug;
                updatedBug.id = bug.key;
                obs.next(updatedBug);
                
            },
            err => {
                obs.throw(err);
            });
        });
    }
     deletedListener(): Observable<any> {
        return Observable.create(obs => {
            this.bugsDBRef.on('child_removed', bug1 => {
                const deletedBug = bug1.val() as Bug;
                deletedBug.id = bug1.key;
                obs.next(deletedBug);
                
            },
            err => {
                obs.throw(err);
            });
        });
    }

   
    addBug(bug: Bug) {
        // get a reference to a new object
        const newBugRef = this.bugsDBRef.push() // creates a unique identifier 
        newBugRef.set({
            title: bug.title,
            status: bug.status,
            severity: bug.severity,
            description: bug.description,
            createdBy: 'Nick',
            createdDate: Date.now() // gives us today in milleseconds
        })
        .catch(err => console.error('unable to add bug to firebase - ', err));
    }
    
    updateBug(bug: Bug) {
        const currentBugRef = this.bugsDBRef.child(bug.id); // bring down the id from the bug object so the URL: /bug/uniqueIdentifier
        bug.id = null; //nullify bug id : dont save to firebase.  firebase will not create details for it 
        bug.updatedBy = "Nick Chlam";
        bug.updatedDate = Date.now();
        currentBugRef.update(bug);
    }
    deleteBug(bug: Bug) {
        const deleteBugRef = this.bugsDBRef.child(bug.id);
        bug.id = null;
        deleteBugRef.remove();
    }

}

