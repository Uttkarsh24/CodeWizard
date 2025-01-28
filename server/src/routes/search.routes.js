import router, { Router } from 'express';
import { search } from '../controllers/search.controller.js';

const searchRouter = Router();

searchRouter.route("/search").get(search);

export default searchRouter;