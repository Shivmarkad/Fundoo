import express from 'express';
import * as userController from '../controllers/user.controller';
import * as validator from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to create a new user
router.post('', validator.newUserValidator, userController.signUp); 

// to login the user
router.post('/login',validator.loginUserValidator, userController.signIn)

// to reset password
router.post('/reset',validator.resetPasswordValidator,userAuth,userController.resetPassword)

// to reset password
router.post('/forgot',userController.forgotPassword)

export default router;
