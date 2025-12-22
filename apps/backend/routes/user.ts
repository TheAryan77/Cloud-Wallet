import Router from "express"
const router = Router();
import { client } from "../../../packages/db"
import jwt from "jsonwebtoken"
import {signupschema,signinschema} from "../../../packages/common"

// import {client} from "../../packages/db"

router.post("/signup", async (req, res) => {
    const {success,data} = signupschema.safeParse(req.body)
    if(!success){
        return res.status(400).json({
            message:"Invalid credentials"
        })
    }
    
    // Check if user already exists
    const existingUser = await client.user.findFirst({
        where:{
            email:data.email
        }
    })
    if(existingUser){
        return res.status(400).json({
            message:"User already exists"
        })
    }

    // Create new user
    const user = await client.user.create({
        data: {
            email: data.email,
            password: data.password,
            phone: data.phone,
            name: data.name
        }
    })

    const token = jwt.sign({
        userid : user.id
    },process.env.JWT_SECRET as string);

    res.json({
        token,
        message: "User created successfully"
    })
})

router.post("/signin", async (req, res) => {
    const {success,data} = signinschema.safeParse(req.body)
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