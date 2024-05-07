import { type Request, type Response, type NextFunction } from 'express'

export type FunType = (req: Request, res: Response, next: NextFunction) => void
