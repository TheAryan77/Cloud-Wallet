import express from "express"
import cors from "cors";
import userrouter from "./routes/user"
import calenderrouter from "./routes/calender"

import {client} from "../../packages/db"

const app = express();



app.use(express.json())
app.use(cors())
app.use("/auth",userrouter)
app.use("/calender",calenderrouter)


app.get("/",(req,res)=>{
    return res.status(200).json({ 
        message:"Hello from backend"
    })
})

app.listen(3000,()=>{
    console.log("Backend running on port 3000")
})