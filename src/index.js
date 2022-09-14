import express from 'express'
import http from 'http'
import cors from 'cors'
import logger from 'morgan'

import dbConnect from './dbConnection/dbConnect.js'
import routes from './routes/userRoutes.js'



const app = express()

const port = process.env.PORT  || 5000

const server = http.createServer(app)

const database =  "mongodb://localhost:27017/User_details"


dbConnect(database)

// middlewares

app.use(express.json())
app.use(logger('dev'))


// Handling Cors

app.use(cors())

app.use((req,res,next) =>{
    res.header('Access-Control-Allow-Origin','http://localhost:3000')
    res.header('Access-Allow-Control-Headers','Authorization, Content Type, Origin,')
    res.header('Access-Allow-Control-Credentials',true)
    
    if(req.method === "OPTIONS"){
        res.header('Access-Control-Allow-Methods','GET, POST, PATCH, PUT, DELETE')
        return res.status(201).json({})
    }
    next()
})

app.use('/',routes)




server.listen(port,() => {
    console.log(`Server is running as http://localhost:${port}`)
})

