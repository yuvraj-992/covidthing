
var express = require ("express");
var mongoose = require("mongoose");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static('public'))
app.use(express.urlencoded({
    extended:true
}));




mongoose.connect('mongodb://localhost:27017/coviddb',{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in connecting to database"));
db.once('open',()=> console.log("Connected to database"));

app.post("/signup",(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var phno = req.body.phno;
    var altphno = req.body.altphno;
    var pass = req.body.pass;
    var altpass = req.body.altpass;

    var data = {
        "name": name,
        "email" : email,
        "phno" : phno,
        "altphno" : altphno,
        "pass" : pass,
        "altpass" : altpass

    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Register successfull");
    });

    res.sendFile(path.join(__dirname+'/signup_success.html'));
});

app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
   
    res.sendFile(path.join(__dirname+'/signup.html'));
}).listen(3000);
console.log("listening on port 3000");
