const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
        username : {
            type : String,
            required : true,
            minlength : 4,
            trim : true,
            unique : true
        }
    },{
        timestamps : true
    }
);

const User = mongoose.model('User',userSchema);

module.exports = User;