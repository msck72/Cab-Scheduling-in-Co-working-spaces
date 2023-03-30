import { co_working_space } from "./co-working-space.js";

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'co-working-spaces-hub';

// const co_working_space = require('./co-working-space.js');

export class co_working_spaces_hub{
    constructor(){
        this.myWorkspaces = [];
    }

    addWorkspace(wk){
        this.myWorkspaces.push(wk);
    }

    displayLoginPage(res){
        console.log('in co-working-spaces-HUB');
        res.render('co-working-spaces-hub-files/Homepage');
    }

    async authorize(req , res){
        console.log(req.body.user_name);

        await client.connect();
        console.log('Connected successfully to server');
        const db = client.db(dbName);
        const collection = db.collection('co_working_spaces');
        const filteredDocs = await collection.find({user_name : String(req.body.user_name) , password: String(req.body.password)}).toArray();

        // console.log('filteredDocs : ' + filteredDocs[0].name);
        client.close();
        if(filteredDocs.length != 0){
            console.log(`Hi Mr.${req.body.user_name}`);
            let working_space = new co_working_space(filteredDocs[0].name);
            this.addWorkspace(working_space);
            working_space.displayHomePage(res);
            return;
        }

        // res.alert('Invalid Login');
        // res.redirect('/Login');
        res.render('co-working-spaces-hub-files/Homepage', {status : 'Invalid Login'})
        
        
    }

    async createAccount(req , res){
        await client.connect();
        console.log('Connected successfully to server');
        const db = client.db(dbName);
        const collection = db.collection('co_working_spaces');
        const filteredDocs = await collection.find({user_name : String(req.body.user_name)}).toArray();

        client.close();
        if(filteredDocs.length == 0){
            // alert('Account successfully created');
            await collection.insertOne({name: String(req.body.name) , password:  String(req.body.password) , user_name : String(req.body.user_name), email: String(req.body.email)})
            let working_space = new co_working_space(String(req.body.name));
            working_space.displayHomePage(res);
            return;
        }

        // res.write(`<script> alert('Login Unsuccessful') </script>`);
        // await sleep(2000);
        // res.rediect('/Login');
        res.render('co-working-spaces-hub-files/Homepage', {status : 'create account unsuccessfull'})
    }

    details(){
        var str = '';
        for(var i = 0; i < this.myWorkspaces.length; i++){
            str = str + this.myWorkspaces[i].details() + '\n';
        }

        return str;
    }


}

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }