import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';

export const signUp = async (req, res, next) => {  //signup
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


// export const signIn = async (req, res, next)=>{    //signin
//   try {
//     const data = await UserService.signIn(req.body.email, req.body.password);
//     res.status(HttpStatus.OK).json({
//       code : HttpStatus.OK,
//       data : data.email,
//      message: "User Login successfully"
//     });
//   } catch(error){
//     next(error);
//   }
// }