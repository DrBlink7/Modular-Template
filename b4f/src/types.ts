import { Request, Response, NextFunction } from "express";

export type FunType = (req: Request, res: Response, next: NextFunction) => void;
