import { Rating } from "../models";
import { createClient } from "redis";

// Инициализация клиента Redis
const redisClient = createClient({
    url: process.env.REDIS_URL || "redis://redis:6379", // Подключение к Redis в Docker
});

redisClient.on("error", (err) => console.error("Redis Client Error", err));

// Подключаем клиента Redis
(async () => {
    await redisClient.connect();
})();

export class RatingService {
    private readonly cacheTTL = 60; // Время хранения кэша в секундах

    async addRating(rate: number) {
        const rating = await Rating.create({ rate });

        // Удаляем кэш после добавления нового рейтинга
        await redisClient.del("averageRating");

        return rating;
    }

    async getAverageRating() {
        // Проверяем, есть ли значение в Redis
        const cachedAverage = await redisClient.get("averageRating");
        if (cachedAverage) {
            console.log("Cache hit:", cachedAverage);
            return Number(cachedAverage);
        }

        // Если кэша нет, вычисляем значение
        const ratings = await Rating.findAll();

        if (ratings.length === 0) {
            return 0;
        }

        const total = ratings.reduce((sum, rating) => sum + Number(rating.dataValues.rate), 0);
        const average = total / ratings.length;

        // Сохраняем среднее значение в Redis
        await redisClient.set("averageRating", String(average), {
            EX: this.cacheTTL, // Время жизни в секундах
        });

        console.log("Cache miss: Calculated and stored average:", average);

        return average;
    }
}
