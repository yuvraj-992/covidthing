var express = require("express");
var mongoose = require("mongoose");
const path = require ("path");

const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({
    extended:true
}));

mongoose.connect(('mongodb://localhost:27018/coviddb1',{
    UseNewUrlParser:true,
    UseUnifiedTopology:true

}));

var db1 = mongoose.connection;

db1.on('error',()=> console.log("Error in connecting to the database"));
db1.once('open',()=>console.log("Connected to the database"));

app.post("/login",async(req,res)=>{
    try {
        var email = req.body.email;
        var pass = req.body.pass;
        const useremail =await db.findOne({email:email});
        if(useremail.password === password ){
            res.status(201).render("index");

        }
        else{
            res.send("password is not matching");
        }
    }
    catch(error){

        res.status(400).send("invalid details");

    }
    
    

    var data = {
        "email" : email,
        "pass" : pass 

    }

    db1.connection('users').insertOne(data,(err,collection)=>{
        if(err)
        {
            throw(err);
        }
        console.log("login successful");
    })
})
