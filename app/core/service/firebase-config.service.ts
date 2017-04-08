import { Injectable } from '@angular/core';

import * as firebase from 'firebase';
// add database in - of the SDK 
require('firebase/database');

import {FIREBASE_CONFIG } from '../constant/constants';

@Injectable()

export class FirebaseConfigService{

    private _database: firebase.database.Database; // property to reference to database when we inject service 


    constructor() {
        this.configureApp();
        this.configureDatabase();

    }
    configureApp() {
       firebase.initializeApp(FIREBASE_CONFIG);
       
    }
    configureDatabase() {
        this._database = firebase.database(); //reference to database 

    }
    public get database() {
        return this._database;
    }
   
}