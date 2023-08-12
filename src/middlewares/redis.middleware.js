import HttpStatus from 'http-status-codes';
import {client} from '../config/redis';

export const redisData = async (req, res, next) => {
    try {
   
      const redisData = await client.get(req.body.createdBy);
      
      if (redisData !== null){
        const data = JSON.parse(redisData);
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: data,
            message: 'Notes fetched from redis successfully'
          });
      }else{
          next();
      }
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
      code : HttpStatus.BAD_REQUEST,
     message: `error occured while getting data from redis ${error}`
    });
    }
  };