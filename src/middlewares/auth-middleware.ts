import { NextFunction, Response, Request } from 'express'

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // const login = req.query.login
    // const password = req.query.password

    if (req.headers.authorization?.split(' ')[0] !== 'Base') {
        res.sendStatus(401)
        return
    }

    next()
}