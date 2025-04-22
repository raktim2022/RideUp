const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    fullName: {
        firstName:{
            type: String,
            required: true,
            minlength: [2, 'First name must be at least 2 characters'],
        },
        lastName:{
            type: String,
            required: true,
            minlength: [2, 'Last name must be at least 2 characters'],
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'Email must be at least 5 characters'],
    },
    password: {
        type: String,
        required: true,
        minlength: [8, 'Password must be at least 8 characters'],
        select: false,
    },
    socketId:{
        type: String,
        default: null,
    }
});

UserSchema.method.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}
UserSchema.method.comparePassword = function(password) {
    return bcrypt.compare(password, this.password);
}

UserSchema.static.hashPassword = function(password) {
    return bcrypt.hash(password, 10);
}

const userModel = mongoose.model('User', UserSchema);

module.exports = userModel;