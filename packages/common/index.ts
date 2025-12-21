import z from "zod"

export const signupschema = z.object({
    phone:z.string(),
    email : z.string(),
    name : z.string(),
    password : z.string()
})