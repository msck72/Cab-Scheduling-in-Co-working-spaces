import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'co-working-spaces-hub';


export class co_working_space{
    constructor(name){
        this.name  = name;
    }

    displayHomePage(res){
        console.log('in co-working-spaces-HUB');
        res.render('co-working-space-files/HomePage', {user_name : this.name});
    }

    async addRentalFirms(req , res){

        console.log('In workspace ' + this.name);
        console.log(req.body.user_name);
        console.log(req.body.name);
        console.log(req.body.email);


        console.log(req.body.user_name);

        await client.connect();
        console.log('Connected successfully to server');
        const db = client.db(dbName);
        const collection = db.collection('rental_firms');
        const filteredDocs = await collection.find({user_name : String(req.body.user_name)}).toArray();

        // console.log('filteredDocs : ' + filteredDocs[0].name);
        client.close();
        if(filteredDocs.length == 0){
            console.log('Can be added');
            await collection.insertOne({name: String(req.body.name) , password:  String(req.body.user_name) , user_name : String(req.body.password), email : String(req.body.email)});
            console.log('Added successfully');
            res.render('co-working-space-files/HomePage', {status : "Added Successfully"});
            return;
        }

        console.log('cannot be added');
        res.send(req.body.user_name + ' ' + req.body.name + ' ' + req.body.email);

    }

    details(){
        return 'name = ' + this.name;
    }
}