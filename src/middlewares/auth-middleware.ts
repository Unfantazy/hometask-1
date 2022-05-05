import { NextFunction, Response, Request } from 'express'

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        res.sendStatus(401)
        return
    }
    
    if (req.headers.authorization.split(' ')[0] === 'Bearer') {
        res.send(401)
        return
    }

    const token = req.headers.authorization.split(' ')[1]

    const buff = new Buffer(token, 'base64')
    const decodedToken = buff.toString('ascii').split(':')

    const login = decodedToken[0]
    const password = decodedToken[1]

    if (login !== 'admin' || password !== 'qwerty') {
        res.sendStatus(401)
        return
    }

    next()
}