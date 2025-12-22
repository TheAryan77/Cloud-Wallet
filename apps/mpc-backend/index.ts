import express from "express"
import { TSSCli } from "solana-mpc-tss-lib/mpc"
import {client} from "../../packages/mpc-db"
import { NETWORK } from "../../packages/common/solana"

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


app.listen(3002,()=>{
    console.log("MPC Backend running on port 3002")
})