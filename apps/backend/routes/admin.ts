import Router from "express"
const router = Router();
import { client } from "../../../packages/db"
import jwt from "jsonwebtoken"
import {signupschema,signinschema} from "../../../packages/common"
import axios from "axios";
import { adminauthmiddleware } from "../middlewares/authmiddleware";
import { TSSCli } from "solana-mpc-tss-lib/mpc"
import {NETWORK} from "common/solana"


export const cli = new TSSCli(NETWORK);

const MPC_SERVERS=[
    "https://mpc-1.ledger.com",
    // "https://mpc-2.ledger.com",
    // "https://mpc-3.ledger.com",
]

const MPC_THRESHOLD = Math.min(1,MPC_SERVERS.length - 1);

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
    },process.env.ADMIN_JWT_SECRET as string);



    res.json({
        token
    })

})

router.post("/create-user",adminauthmiddleware ,async  (req,res)=>{
    const {success,data} = signupschema.safeParse(req.body)

    if(!success){
        return res.json({
            message:"Invalid credentials"
        })
    }

    const user = await client.user.create({
        data: {
            email: data.email,
            password: data.password,
            phone: data.phone,
            role: "USER",
            name: data.name
        }
    })

    if(!user){
        return res.json({
            message:"User not created"
        })
    }

    const responses = await Promise.all(MPC_SERVERS.map(async (server) => {
        const response = await axios.post(`${server}/create-user`, {
            userid: user.id
        })
        return response.data
    }));

    const aggregatedPublicKey = cli.aggregateKeys(responses.map((r) => r.publicKey), MPC_THRESHOLD);
    console.log(aggregatedPublicKey);
    
    await client.user.update({
        where: {
            id: user.id
        },
        data: {
            publicKey: aggregatedPublicKey.aggregatedPublicKey
        }
    })

    await cli.airdrop(aggregatedPublicKey.aggregatedPublicKey, 1000000000);

    res.json({
        success:true,
        data:user,
        message:"User created successfully"
    })


})



export default router