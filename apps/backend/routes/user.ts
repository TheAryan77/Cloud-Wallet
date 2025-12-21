import Router from "express"
const router = Router();
import { client } from "../../../packages/db"
import jwt from "jsonwebtoken"
import {signupschema} from "../../../packages/common"
// import {client} from "../../packages/db"

router.post("/sigin", async (req, res) => {
    const {success,data} = signupschema.safeParse(req.body)
    if(!success){
        return res.status(400).json({
            message:"Invalid credentials"
        })
    }
    const user = await client.user.findFirst({
        where:{
            email:data.email
        }
    })
    if(!user){
        return res.status(400).json({
            message:"User not found"
        })
    }
    if(user.password !== data.password){
        return res.status(400).json({
            message:"Invalid password"
        })
    }
    const token = jwt.sign({
        userid : user.id
    },process.env.JWT_SECRET as string);



    res.json({
        token
    })

})


export default router