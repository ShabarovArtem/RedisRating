import { Rating } from "../models";
import { createClient } from "redis";

const redisClient = createClient({
    url: process.env.REDIS_URL || "redis://redis:6379",
});

redisClient.on("error", (err) => console.error("Redis Client Error", err));

(async () => {
    await redisClient.connect();
})();

export class RatingService {
    private readonly cacheTTL = 60;

    async addRating(rate: number) {
        const rating = await Rating.create({ rate });

        await redisClient.del("averageRating");

        return rating;
    }

    async getAverageRating() {
        const cachedAverage = await redisClient.get("averageRating");
        if (cachedAverage) {
            console.log("Cache hit:", cachedAverage);
            return Number(cachedAverage);
        }

        const ratings = await Rating.findAll();

        if (ratings.length === 0) {
            return 0;
        }

        const total = ratings.reduce((sum, rating) => sum + Number(rating.dataValues.rate), 0);
        const average = total / ratings.length;

        await redisClient.set("averageRating", String(average), {
            EX: this.cacheTTL,
        });

        console.log("Cache miss: Calculated and stored average:", average);

        return average;
    }
}
