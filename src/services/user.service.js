// import { result } from '@hapi/joi/lib/base';
import User from '../models/user.model';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import { sendNewMail } from '../utils/email';
import { send } from '../utils/send';
import { receive } from '../utils/recieve';

//signUp for new user
export const signUp = async (body) => {
  const user = await User.findOne( {email: body.email} );
  if (user) {
    throw new Error("You are already registered!!");
  };
  const saltRounds = 10;
  const hash = bcrypt.hashSync(body.password, saltRounds);
  body.password = hash;
  const data = await User.create(body);
  send(`${data.firstName} User Created Successfull`);
  receive();
  const {firstName,lastName, email} = data
  return {firstName,lastName,email};
};

//signIn registered user
export const signIn = async (email, password) => {

  const data = await User.findOne({ email: email });
  console.log("this is the data during sign in",data);
  if (data == null) {
    throw new Error("user not found");
  };
  const hashedPassword = data.password;
  const isTrue = bcrypt.compareSync(password, hashedPassword);

  if (isTrue) {
    var token = jwt.sign({ email: data.email, id: data.id }, process.env.SECRET_KEY);
    return token;
  } else {
    throw new Error("Password Incorrect");
  }
};

//reset password
export const resetPassword = async (password, id) => {
  const saltRounds = 10;
  const hash = bcrypt.hashSync(password, saltRounds);
  password = hash;
  const update = {
    password:password
  }
  const data = await User.findByIdAndUpdate({_id:id}, update, {
    new: true
  });
  if (data) {
    return data.email;
  } else {
    throw new Error("Unable to reset Password");
  }
};

//forgot password
export const forgotPassword = async (email) => {
  
  const data = await User.find({email: email  });
  if (data) {
    var token = jwt.sign({ email: data.email, id: data.id }, process.env.SECRET_KEY);
    const sent = sendNewMail(token,data.email)
    return sent;
  } else {
    throw new Error("Unable to change Password");
  };
};