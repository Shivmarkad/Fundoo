import { result } from '@hapi/joi/lib/base';
import sequelize, { DataTypes } from '../config/database';
const User = require('../models/user')(sequelize, DataTypes);
import bcrypt from 'bcrypt'

//create new user
export const signUp = async (body) => {
  const saltRounds = 10;
  const hash = bcrypt.hashSync(body.password, saltRounds);
  body.password = hash;
  const data = await User.create(body);
  return data;
};

export const signIn = async (email, password) => {

  const data = await User.findOne({ where: { email: email } })
  const hash = data.password;
  const isTrue = bcrypt.compareSync(password, hash);
  if(isTrue){
    return data.email;
  }else{
    return "Login failed";
  }
}