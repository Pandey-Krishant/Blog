import express from'express'
import authController from '../controllers/auth.controller.js'

const router = express.Router()

//user auth APIs
router.post('/user/register', authController.registerUser)// yha jo authcontroller h..uski spelling humney upper import jesi likhi h....
router.post('/user/login', authController.loginUser)
router.get('/user/logout', authController.logoutUser)


export default router;