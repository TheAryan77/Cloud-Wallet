import type { NextFunction, Request, Response } from "express";
import  jwt, { type JwtPayload } from "jsonwebtoken"
import "dotenv/config"

export function authmiddleware ( req:Request,res:Response,next:NextFunction){
    const header = req.headers.authorization
    const token =   header?.split(" ")?.[1] as string;

    if(!token){
        return res.status(401).json({
            message:"Missing token"
        })
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET as string) as JwtPayload;
        if(decoded && decoded.userid){
            // Use req.body for POST/PUT, initialize if undefined for GET
            if (!req.body) {
                req.body = {};
            }
            req.body.userid = decoded.userid
            next()
        } else {
            return res.status(401).json({
                message:"Invalid token payload"
            })
        }
    }
    catch(e){
        console.error("Token verification error:", e);
        return res.status(401).json({
            message:"Invalid token",
            error: e instanceof Error ? e.message : "Unknown error"
        })
    }
}


export function adminauthmiddleware ( req:Request,res:Response,next:NextFunction){
    const header = req.headers.authorization
    const token =   header?.split(" ")?.[1] as string;

    if(!token){
        return res.status(401).json({
            message:"Missing token"
        })
    }

    try{
        const decoded = jwt.verify(token,process.env.ADMIN_JWT_SECRET as string) as JwtPayload;
        if(decoded && decoded.userid){
            // Use req.body for POST/PUT, initialize if undefined for GET
            if (!req.body) {
                req.body = {};
            }
            req.body.userid = decoded.userid
            next()
        } else {
            return res.status(401).json({
                message:"Invalid token payload"
            })
        }
    }
    catch(e){
        console.error("Token verification error:", e);
        return res.status(401).json({
            message:"Invalid token",
            error: e instanceof Error ? e.message : "Unknown error"
        })
    }
}

