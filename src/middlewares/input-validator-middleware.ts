import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'

export const inputValidatorMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // here we make validation. Also here we can transform returned object (for example to satisfy the Swagger API)
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errorMessages: errors.array().map(error => ({
                message: error.msg,
                field: error.param
            })),
            resultCode: 1
        })
    }

    next()
}