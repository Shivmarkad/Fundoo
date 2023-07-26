import express from 'express';
const router = express.Router();

import userRoute from './user.route';
import noteRoute from './notes.route'
/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = () => {
  router.get('/', (req, res) => {
    res.json('Welcome to Fundoo App');
  });
  router.use('/users', userRoute);
  router.use('/note',noteRoute);
  return router;
};

export default routes;
