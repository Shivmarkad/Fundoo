import { result } from '@hapi/joi/lib/base';
import sequelize, { DataTypes } from '../config/database';
const User = require('../models/user')(sequelize, DataTypes);
import bcrypt from 'bcrypt'

//signUp for new user
export const signUp = async (body) => {
  const saltRounds = 10;
  const hash = bcrypt.hashSync(body.password, saltRounds);
  body.password = hash;
  const data = await User.create(body);
  return data;
};

//signIn registered user
export const signIn = async (email, password) => {

  const data = await User.findOne({ where: { email: email } })
  if(data == null){
    return "user not found";
  }
  const hash = data.password;
  const isTrue = bcrypt.compareSync(password, hash);
  if(isTrue){
    return data.email;
  }else{
    return "Login failed incorrect password";
  }
}