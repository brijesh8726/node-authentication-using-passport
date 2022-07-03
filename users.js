const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({

    name:String,
    username:{
        type: String,
        required: true,
        unique: true
    },
    password: String
});
const users = mongoose.model("users",userSchema);
module.exports = users;