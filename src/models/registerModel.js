

import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        uppercase:true,
        required:true,
        trim:true,
        minlength:3,
        maxlength:20
    },
    email:{
        type:String,
        lowercase:true,
        required:true,
        trim:true,
        minlength:3,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is not valid')
            }
        }
    },
   
    phone:{
      type: Number,
      required: [true, "Contact number is required"],
      minLength: 10,
      maxLength: 10,
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:8,
        
    },
    cpassword:{
        type:String,
        required:true,
        trim:true,
        
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
})



userSchema.pre("save",async function(next){
    try {
        if(this.isModified('password')){
            this.password = await bcrypt.hash(this.password,10)
            this.cpassword = await bcrypt.hash(this.cpassword,10)
            // console.log(this.password)
            // console.log(this.cpassword)
            next()
        }
    } catch (error) {
        console.log('hash error :',error)
    }
})


userSchema.methods.generateAuthToken = async function(){
    try {
        const token = await jwt.sign({id:this._id.toString()},"thisismyjsonwebtokensecretkeyforcookie")
        this.tokens = this.tokens.concat({token})
        console.log('token generated',token)
        await this.save()
        return token

    } catch (error) {
        console.log('token error:',error)
        
    }
}


const RegisterModel = mongoose.model('user',userSchema)

export default RegisterModel

