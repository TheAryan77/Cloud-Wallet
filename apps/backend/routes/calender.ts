import {Router} from "express"
import authmiddleware from "../middlewares/authmiddleware"
import { client } from "../../../packages/db"

const  router = Router();    

router.get("/:courseid", authmiddleware, async (req, res) => {
    const {courseid} = req.params;
    if(!courseid){
        return res.status(400).json({
            message:"Missing courseid"
        })
    }

    const course = await client.courses.findFirst({
        where:{
            id:courseid
        }
    })
    if(!course){
        return res.json({
            message:"Course not found"
        })
    }

    const purchased = await client.purchases.findFirst({
        where:{
            userId:req.body.userid,
            courseId:courseid
        }
    })
    if(!purchased){
        return res.json({
            message:"You have not purchased"
        })
    }

    res.json({
        message:"Success",
        calenderid:course.calendarNotionId
    })
    
    
})

export default router