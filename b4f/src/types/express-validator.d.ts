declare module 'express-validator' {
  import { Request, Response, NextFunction } from 'express';

  export interface ValidationError {
    msg: string;
    param: string;
    location: string;
    value: any;
  }

  export interface Result {
    isEmpty(): boolean;
    array(): ValidationError[];
  }

  export function validationResult(req: Request): Result;
  export function body(field: string): any;
  export function param(field: string): any;
  export function query(field: string): any;
}
