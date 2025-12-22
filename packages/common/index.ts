import z from "zod"

export const signupschema = z.object({
    phone:z.string(),
    email : z.string(),
    name : z.string(),
    password : z.string()
})
export const signinschema = z.object({
    email : z.string(),
    password : z.string()
})