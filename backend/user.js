var mongoose = require('mongoose');
const crypto = require('crypto');
const uuidv1 = require('uuid/v1');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 30,
        trim: true,
        required: true
    },
    lastname: {
        type: String,
        maxlength: 30,
        trim: true,
        required: false
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    encrypted_password: {
        type: String,
        maxlength: 20,
        required: true
    },
    userinfo: {
        type: String,
        trim: true
    },
    salt: String,
    role: {
        type: Number,
        default: 0
    },
    orders: {
        type: Array,
        default: []
    }
},
{timestamps: true });

userSchema
	.virtual("password")
    .set(function (password) {
        this._password = password; //passing the value of password in this._password which is a private variable
        this.salt = uuidv1(); //uuidv1 is adding the ramdom salt string to the salt variable 
        this.encrypted_password = this.securePassword(password); //the crypto value returned by the function securePassword will be stored in the encrypted password

    })
    .get(function () {
        return this._password;
    })


userSchema.methods = {

    authenticate: function (plainpassword) {
        return this.securePassword(plainpassword) === this.encrypted_password; //This is to authenticate the user login
    },
    securePassword: function (plainpassword) {
        if (!plainpassword)
            return "";
        try {
            return crypto
                .createHmac('sha256', this.salt)
                .update(plainpassword) //this will update the plainpassword provided by user.
                .digest("hex");
        } catch (error) {
            return ""
        }
    }
}

module.exports = mongoose.model("User", userSchema); //to export this model of userSchema