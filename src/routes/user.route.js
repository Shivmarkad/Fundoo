import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to create a new user
router.post('', newUserValidator, userController.signUp); 

// to login the user
router.post('/login',userController.signIn)

// to reset password
router.post('/reset',userAuth,userController.resetPassword)

// to reset password
router.post('/forgot',userController.forgotPassword)

export default router;
