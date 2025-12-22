import {Router} from "express"
import {authmiddleware} from "../middlewares/authmiddleware"
import { client } from "../../../packages/db"

const  router = Router();    

router.get("/", authmiddleware, async (req, res) => {
    try {
        const purchases = await client.purchases.findMany({
            where: {
                userId: req.body.userid
            },
            include: {
                course: true
            }
        });

        const courses = purchases.map(purchase => ({
            id: purchase.course.id,
            title: purchase.course.title,
            slug: purchase.course.slug,
            calendarNotionId: purchase.course.calendarNotionId
        }));

        res.json({
            message: "Success",
            courses
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch courses"
        });
    }
});

router.post("/add", authmiddleware, async (req, res) => {
    const {calenderid,title,slug} = req.body;
    if(!calenderid){
        return res.status(400).json({
            message:"Missing calenderid"
        })
    }
    const course = await client.courses.create({
        data: {
            title,
            slug,
            calendarNotionId:calenderid
        }
    })
    res.json({
        message:"Success",
        course
    })
})


router.get("/:courseid",authmiddleware, async (req, res) => {
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