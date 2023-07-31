// import { result } from '@hapi/joi/lib/base';
import sequelize, { DataTypes } from '../config/database';
const User = require('../models/user')(sequelize, DataTypes);
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

//signUp for new user
export const signUp = async (body) => {
  const user = await User.findOne({ where: { email: body.email } });
  if (user) {
    throw new Error("You are already registered!!");
  };
  const saltRounds = 10;
  const hash = bcrypt.hashSync(body.password, saltRounds);
  body.password = hash;
  const data = await User.create(body);
  return data.email;
};

//signIn registered user
export const signIn = async (email, password) => {

  const data = await User.findOne({ where: { email: email } });
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
  const data = await User.update({password:password},{where: {id: id}})
  if (data) {
    return data.email;
  } else {
    throw new Error("Unable to reset Password");
  }
};

//forgot password
export const forgotPassword = async (email, password) => {
  
  const data = await User.findOne({ where: { email: email } });
  if (data) {
    var token = jwt.sign({ email: data.email, id: data.id }, process.env.SECRET_KEY);
    return token;
  } else {
    throw new Error("Unable to change Password");
  };
};