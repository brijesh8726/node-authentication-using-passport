
const express = require('express');
const app = express();
const connectMongoose = require('./db');
const users = require('./users');
const ejs = require('ejs');
const passport = require('passport');
const { initializingPassport , isauthenticated} = require('./passportconfic');
const expressSession= require('express-session');


connectMongoose();
initializingPassport(passport);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(expressSession({
    secret: "secret", resave: false,saveUninitialized: false
}));



app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');
app.get('/',(req,res)=>{
    res.render("index");
});
app.get('/register',(req,res)=>{
    res.render("resister");
});
app.get('/login',(req,res)=>{
    res.render("login");
});
app.get('/logout',(req,res)=>{
    req.logout();
    // res.redirect('/');
    res.send("logout sucessful");

});

app.post('/register',async (req,res)=>{
    const user = await users.findOne({username: req.body.username});
    if(user) return res.status(400).send("user already exixts");
    const newUser = await users.create(req.body);
    res.status(201).send(newUser);
});

app.post('/login',passport.authenticate('local', {failureRedirect: "./login", successRedirect:"/"}), async (req,res)=>{

});

app.get('/profile', isauthenticated,(req,res)=>{
    res.send(req.user);

});
app.listen(9001,()=>{
    console.log("server started");
});