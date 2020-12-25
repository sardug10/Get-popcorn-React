const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Please tell us your name']
    },
    email:{
        type:String,
        required:[true, 'Please provide us your email'],
        unique:true,
        lowercase:true,
        validate:[validator.isEmail,'Please provide us a valid E-mail']
    },
    password:{
        type:String,
        required:[true,'Please enter a password'],
        minlength:8,
        select:false
    },
    confirmedPassword:{
        type:String,
        required:[true,'Please confirm your password'],
        validate:{
            validator:function(el){
                return el === this.password
            },
            message:'Passwords does not match'
        }
    }
})

userSchema.pre('save', async function(next){
   if(!this.isModified('password')) return next();

   this.password = await bcrypt.hash(this.password, 12);

   this.confirmPassword = undefined
   next();
})

userSchema.methods.correctPassword = async function (password, storedPassword) {
    return await bcrypt.compare(password, storedPassword);
};

const User = mongoose.model('User',userSchema)

module.exports = User;