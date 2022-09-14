
import Register from '../models/registerModel.js'
import bcrypt from 'bcryptjs'
// import Cookies from 'universal-cookie'

// const cookie =new Cookies()


export const registerUser =async (req,res) => {
    const {name,email,phone,password,cpassword} =req.body
   

    if(!name || !email || !phone || !password || !cpassword  ){
        
        return res.status(422).json({status:422,error:'please filled the required field'})
    }
    try {
        const userExist = await Register.findOne({email})
        if(userExist){
            return res.json({ error:'Email already registered'})
        }else if(password !== cpassword){
            return res.json({error:`Password didn't match`})
        }else{
            const user = new Register({name,email,phone,password,cpassword})

                   
            const registeredUser = await user.save()
            console.log(registeredUser)
            res.status(201).json({message:'User registered succesfully'})

        }
        
    } catch (error) {
       console.log(error) 
       res.status(422).json({message:'User not found'})

    }
} 


// Signin Route ................

export const userLogin =async (req,res) => {
    try {
        const {email, password} = req.body

        if(!email || !password){
            console.log(`please fill all the fields`)
            return res.status(422).json({status:422,error:'Please fill required field'})
        }
        
        const user = await Register.findOne({email})

       if(user){
            console.log(user)
            const isMatch  = bcrypt.compare(password,user.password)

            const token = await user.generateAuthToken()
            

            if(!isMatch){
                res.status(400).json({error:'Invalid login credentials'})
            }
            else{
                res.status(200).json({message:'User login successfully',token,user})
            }
       }
       else{
        res.status(400).json({error:'Invalid login credentials'})
       }
    } catch (error) {
        console.log(error)
    }
}

// get user list
export const userList =async (req,res) => {
    try {
        
        const users = await Register.find().select("-password -cpassword -tokens")

        

       if(users){
            
                res.status(200).json({message:'Data fetched successfully',status:200,users})
            
       }
       else{
        res.status(400).json({error:'Something went wrong'})
       }
    } catch (error) {
        console.log(error)
    }
}


