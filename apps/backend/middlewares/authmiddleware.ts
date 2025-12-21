import type { NextFunction, Request, Response } from "express";
import  jwt, { type JwtPayload } from "jsonwebtoken"

function authmiddleware ( req:Request,res:Response,next:NextFunction){
    const header = req.headers.authorization
    const token =   header?.split(" ")?.[1] as string;

    if(!token){
        return res.json({
            message:"Missing token"
        })
    }

    try{
        const {userid} = jwt.verify(token,process.env.JWT_SECRET as string) as JwtPayload;
        if(userid){
            req.body.userid = userid
        }
    }
    catch(e){
        return res.json({
            message:"Invalid token"
        })
    }

    

    next()
}

export default authmiddleware