import mongoose from 'mongoose'


const dbConnect = async (dbms) => {
    try {
        await mongoose.connect(dbms)
        console.log(`DB Connected sucessfully !`)
        
    } catch (error) {
        console.log(`Connection Error: ${error}`)
    }
}

export default dbConnect