import express from "express";
import { RatingController } from "../controllers";
import {body} from "express-validator";
import { ValidateBody } from "../middleware";

export const router = express.Router();
const ratingController = new RatingController();

router.post(
    "/add",
    body("rate").isInt({ min: 1, max: 5 }).withMessage("Rate must be between 1 and 5"),
    ValidateBody,
    async (req, res) => {
        await ratingController.addRating(req, res);
    }
);

router.get(
    "/",
    async (req, res) => {
        await ratingController.getAverageRating(req, res);
    }
);
