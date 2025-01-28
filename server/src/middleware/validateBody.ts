import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

// Валидация тела запроса
export const ValidateBody = (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // Если ошибки есть, отправляем ответ с ошибками
        res.status(400).json({ errors: errors.array() });
        return;
    }
    next();
};