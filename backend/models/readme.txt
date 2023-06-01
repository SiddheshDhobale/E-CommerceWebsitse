->File user.js containing the schema structure for MongoDB with userSchema.
->userSchema.method is containing a function securePassword that is getting the plain password provided by the user and encrypt it using the 
createHmac method which is using the salt update using the plainpassword to update and digest 
-> At the end simply exporting the userSchema module using mongoose.model method.
->schema.virtual is function that getting the password value 
-> .set method is getting the password argument and inside that adding the salt with uuid and storing that password into encrypted_password
-> authenticate method is to authenticate the user at the time of login by comparing the crypto returned by the securePassword method and 
    the value which is already there in the encrypted_password.
->category schema is the schema model used for example, Summer Collection,Winter Collection etc.
->Product Schema containing the schema model of the product which going to ne sale on the application