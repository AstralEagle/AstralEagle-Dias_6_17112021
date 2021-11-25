const mongoose = require('mongoose');

const validator = require('mongoose-unique-validator');

const schema = mongoose.Schema({
    email: { type: String, required:true, unique: true},
    password: { type: String, required:true}
});
schema.plugin(validator);

module.exports = mongoose.model('User', schema);