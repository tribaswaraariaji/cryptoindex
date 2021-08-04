const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const Schema = mongoose.Schema;

const userDataSchema = new Schema({
    username:{type: String,trim: true, required: true},
    email:{type: String,trim: true, required: true},
    accountNumber:{type: String,trim: true, required: true},
    identityNumber:{type: String,trim: true, required: true},
    password:{type: String,trim: true, required: true},
});

userDataSchema.pre('save', function(next){
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
});

const UserData = mongoose.model('UserData', userDataSchema);

module.exports = UserData;