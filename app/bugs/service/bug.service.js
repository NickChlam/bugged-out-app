"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var Observable_1 = require('rxjs/Observable');
var firebase_config_service_1 = require('../../core/service/firebase-config.service');
var BugService = (function () {
    function BugService(fire) {
        this.fire = fire;
        this.bugsDBRef = this.fire.database.ref('/bugs'); // points to root database
    }
    //create a method that will listen for child added - get initial list of data
    // use it to keep watching for added children
    BugService.prototype.getAddedBugs = function () {
        var _this = this;
        return Observable_1.Observable.create(function (obs) {
            _this.bugsDBRef.on('child_added', function (bug) {
                var newBug = bug.val();
                newBug.id = bug.key;
                obs.next(newBug); //extracts the content of the snapshot creates JS object but we cast our bug object from above
            }, function (err) {
                obs.throw(err);
            });
        });
    }; // end getAddedBugs
    BugService.prototype.changedListener = function () {
        var _this = this;
        return Observable_1.Observable.create(function (obs) {
            _this.bugsDBRef.on('child_changed', function (bug) {
                var updatedBug = bug.val();
                updatedBug.id = bug.key;
                obs.next(updatedBug);
            }, function (err) {
                obs.throw(err);
            });
        });
    };
    BugService.prototype.deletedListener = function () {
        var _this = this;
        return Observable_1.Observable.create(function (obs) {
            _this.bugsDBRef.on('child_removed', function (bug1) {
                var deletedBug = bug1.val();
                deletedBug.id = bug1.key;
                obs.next(deletedBug);
            }, function (err) {
                obs.throw(err);
            });
        });
    };
    BugService.prototype.addBug = function (bug) {
        // get a reference to a new object
        var newBugRef = this.bugsDBRef.push(); // creates a unique identifier 
        newBugRef.set({
            title: bug.title,
            status: bug.status,
            severity: bug.severity,
            description: bug.description,
            createdBy: 'Nick',
            createdDate: Date.now() // gives us today in milleseconds
        })
            .catch(function (err) { return console.error('unable to add bug to firebase - ', err); });
    };
    BugService.prototype.updateBug = function (bug) {
        var currentBugRef = this.bugsDBRef.child(bug.id); // bring down the id from the bug object so the URL: /bug/uniqueIdentifier
        bug.id = null; //nullify bug id : dont save to firebase.  firebase will not create details for it 
        bug.updatedBy = "Nick Chlam";
        bug.updatedDate = Date.now();
        currentBugRef.update(bug);
    };
    BugService.prototype.deleteBug = function (bug) {
        var deleteBugRef = this.bugsDBRef.child(bug.id);
        //bug.id = null;
        deleteBugRef.remove();
    };
    BugService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [firebase_config_service_1.FirebaseConfigService])
    ], BugService);
    return BugService;
}());
exports.BugService = BugService;
//# sourceMappingURL=bug.service.js.map