const mongoose = require('mongoose');

const schema = mongoose.model({
    email:{type:String, required:true},
    password:{type:String, required:true}
})


module.exports = mongoose.model('UserSchema',schema);