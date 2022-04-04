const mongoose = require('mongoose');
 
const UserSchema = mongoose.Schema({
    student: String,
    account: String
});
 
module.exports = mongoose.model('User', UserSchema);