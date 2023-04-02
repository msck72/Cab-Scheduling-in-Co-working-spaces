import { createRequire } from "module";
const require = createRequire(import.meta.url);

import { co_working_spaces_hub } from "./co-working-spaces-hub.js";

const express = require('express');
const app = express();
app.use(express.urlencoded({extended: 'true'}));

app.use(express.static("public"));
app.set('view engine' , 'ejs');

let wks = new co_working_spaces_hub();

app.get('/Login', (req , res) => {
    console.log('hello');
    wks.displayLoginPage(res);
})

app.post('/Login_authorization', (req , res) => {
    console.log(req.body.user_name);
    // res.send(`Hi ${req.body.user_name}`);
    wks.authorize(req , res);
})

app.post('/createAccount', (req , res) => {
    console.log(req.body.user_name);
    // res.send(`Hi ${req.body.user_name}`);
    wks.createAccount(req , res);
})


app.post('/createAccount_rentalFirm', (req , res) => {
    // res.send(req.body.user_name + ' ' + req.body.name + ' ' + req.body.email);
    // wks.myWorkspaces.get(0).addRentalFirm(req , res);
    wks.myWorkspaces[0].addRentalFirms(req , res);
    
    // res.send(`Hi ${req.body.user_name}`);
    // wks.createAccount(req , res);
})
app.listen(3000);








