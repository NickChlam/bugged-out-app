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
var bug_service_1 = require('../service/bug.service');
var BugListComponent = (function () {
    //set up subscruption to the method in bugservice
    function BugListComponent(BugService) {
        this.BugService = BugService;
        this.bugs = []; // create an empty array of Bug
    }
    BugListComponent.prototype.ngOnInit = function () {
        this.getAddedBugs();
        this.getUpdatedBugs();
        this.getDeletedBugs();
    };
    BugListComponent.prototype.getAddedBugs = function () {
        var _this = this;
        this.BugService.getAddedBugs()
            .subscribe(function (bug) {
            _this.bugs.push(bug);
        }, function (err) {
            console.error("Unable to get aded bug - ", err);
        });
    };
    BugListComponent.prototype.getUpdatedBugs = function () {
        var _this = this;
        this.BugService.changedListener()
            .subscribe(function (updatedBug) {
            // some magic to find where the index is 
            //get the array index of the bug that matches the updated bug based on id
            //map the array - iterates the array returns everything it finds 
            // put a con
            var bugIndex = _this.bugs
                .map(function (index) { return index.id; })
                .indexOf(updatedBug['id']);
            _this.bugs[bugIndex] = updatedBug;
            console.log(updatedBug['id']); // TODO: Remove 
        }, function (err) {
            console.error("unable to get updated bug - ", err);
        });
    };
    BugListComponent.prototype.getDeletedBugs = function () {
        var _this = this;
        this.BugService.deletedListener()
            .subscribe(function (deletedBug) {
            var bugIndex = _this.bugs
                .map(function (index) { return index.id; })
                .indexOf(deletedBug['id']);
            _this.bugs.splice(bugIndex, 1);
            console.log(deletedBug['title']); // TODO: REMOVE 
        }, function (err) {
            console.error("unable to get deleted bug - ", err);
        });
    };
    BugListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'bug-list',
            templateUrl: 'bug-list.component.html',
            styleUrls: ['bug-list.component.css']
        }), 
        __metadata('design:paramtypes', [bug_service_1.BugService])
    ], BugListComponent);
    return BugListComponent;
}());
exports.BugListComponent = BugListComponent;
//# sourceMappingURL=bug-list.component.js.map