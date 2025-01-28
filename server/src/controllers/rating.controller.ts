import { Request, Response } from "express";
import 'express-async-errors';
import ApiError from "../errors/ApiError";
import { RatingService } from "../services/rating.service";

export class RatingController {
    private ratingService = new RatingService();

    async addRating(req: Request, res: Response) {
        const { rate } = req.body;
        const result = await this.ratingService.addRating(rate);
        res.json({ success: true, rating: result });
    }

    async getAverageRating(req: Request, res: Response) {
        const result = await this.ratingService.getAverageRating();
        res.json({ averageRating: result });
    }
}
