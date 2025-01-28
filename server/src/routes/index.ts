import express from "express";

import {router as ratingController} from "./ratingRouter";

export const router = express.Router();

router.use('/rating', ratingController)
