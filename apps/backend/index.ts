import express from "express"
import cors from "cors";
const app = express();

app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    return res.status(200).json({
        message:"Hello from backend"
    })
})
app.listen(3000,()=>{
    console.log("Backend running on port 3000")
})