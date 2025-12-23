import express from "express"
import { TSSCli } from "solana-mpc-tss-lib/mpc"
import {client} from "../../packages/mpc-db"
import { NETWORK } from "../../packages/common/solana"
// import {client as mainclient} from "../../packages/db"
const cli = new TSSCli(NETWORK);
const app = express()

app.use(express.json())

app.post("/create-user",async (req,res)=>{
    const userid = req.body.userid;
    const participant = await cli.generate();
    await client.share.create({
        data:{
            userId: userid,
            publicKey: participant.publicKey.toString(),
            secretKey: participant.secretKey.toString()
        }
    })

    res.json({
        publicKey: participant.publicKey.toString()
    })
})


app.post("/send/step-1",async (req,res)=>{
    const {to,amount,userid,recentBlockHash} = req.body;
    const user = await client.share.findFirst({
        where:{
            id:userid
        }
    })

    if(!user){
        return res.json({
            message:"User not found"
        })
    }

    // const recentBlockhash = await cli.recentBlockHash();

    const response = await cli.aggregateSignStepOne(
        user.secretKey,
        to,
        amount,
        undefined, // Optional memo
        recentBlockHash
    );

    res.json({
        response
    })

})

app.post("/send/step-2",async (req,res)=>{
    const {to,amount,userid,recentBlockhash,step1Response,allPublicNonces} = req.body;

    const user = await client.share.findFirst({
        where:{
            id:userid
        }
    })

    if(!user){
        return res.json({
            message:"User not found"
        })
    }
     const response = await cli.aggregateSignStepTwo(
        step1Response,
        user.secretKey,
        to,
        amount,
        allPublicNonces,
        undefined,
        recentBlockhash
    );

    res.json({
        response,
        publicKey: user.publicKey

    })
})




app.listen(3002,()=>{
    console.log("MPC Backend running on port 3002")
})