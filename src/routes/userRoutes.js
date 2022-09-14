
import express from 'express'
import {registerUser,userLogin,userList} from '../controllers/user.js'
import {auth} from '../middleware/authenticate.js'

const router = express.Router()

router.post('/register',registerUser)
router.get('/getUsers',userList)
router.post('/signin',userLogin)
  

export default router
