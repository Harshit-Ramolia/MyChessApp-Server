import { Request, Response } from "express";

export type MyContext = {
    req: Request,
    res: Response
}

export type MySession = {
    id: string,
}
