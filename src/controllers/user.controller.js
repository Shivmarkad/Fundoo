import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';

export const signUp = async (req, res, next) => {  
  try {
    const data = await UserService.signUp(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'User created successfully'
    });
  } catch (error) {
    next(error);
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
  } catch(error){
    next(error);
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
  } catch(error){
    next(error);
  }
}

export const forgotPassword = async (req, res, next)=>{    
  try {
    const data = await UserService.forgotPassword(req.body.email, req.body.password);
    res.status(HttpStatus.OK).json({
      code : HttpStatus.OK,
      data : data,
     message: "password changed successfully"
    });
  } catch(error){
    next(error);
  }
}