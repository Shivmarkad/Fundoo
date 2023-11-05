import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';
import {userlogger} from '../config/logger';

export const signUp = async (req, res, next) => {  
  try {
    const data = await UserService.signUp(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'User created successfully'
    });
    userlogger.log('info',`User created successfully ${data}`)
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code : HttpStatus.BAD_REQUEST,
     message: `${error}`
    });
      userlogger.log('error',`Error while signUp ${error}`)
  }
};

export const signIn = async (req, res, next)=>{    
  try {
    const data = await UserService.signIn(req.body.email, req.body.password);
    res.status(HttpStatus.OK).json({
      code : HttpStatus.OK,
      data : data,
     message: "User Login successfully"
    });
    userlogger.log('info',`User signed in successfully ${req.body.email}`)

  } catch(error){
    res.status(HttpStatus.BAD_REQUEST).json({
      code : HttpStatus.BAD_REQUEST,
     message: `${error}`
    });
    userlogger.log('error',`Error while sign in ${error}`)
  }
}

export const resetPassword = async (req, res, next)=>{    
  try {
    const data = await UserService.resetPassword(req.body.password,req.body.createdBy);
    res.status(HttpStatus.OK).json({
      code : HttpStatus.OK,
      data : data,
     message: "password updated successfully"
    });
    userlogger.log('info',`password reset successfully ${data}`)
  } catch(error){
    res.status(HttpStatus.BAD_REQUEST).json({
    code : HttpStatus.BAD_REQUEST,
   message: `${error}`
  });
  userlogger.log('error',`error while reset password ${error}`)
  }
}

export const forgotPassword = async (req, res, next)=>{    
  try {
    const data = await UserService.forgotPassword(req.body.email);
    res.status(HttpStatus.OK).json({
      code : HttpStatus.OK,
      data : data,
     message: "token has been sent to your mail address"
    });
    userlogger.log('info',`token send to mail to reset password ${req.body.email}`)
  } catch(error){
    res.status(HttpStatus.BAD_REQUEST).json({
      code : HttpStatus.BAD_REQUEST,
     message: `${error}`
    });
  }
}