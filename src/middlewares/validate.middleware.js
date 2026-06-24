import { errorMessages } from "vue/compiler-sfc"



export const validateRequest = (schema)=>{
    return (req,res, next)=>{
        
        const result = schema.safeParse(req.body)

        if (!result.success){
            // format the error 
            const formatted = result.error.format()

            // Brig the value of the different errors
            const flatErrors = Object.values(formatted)
                .flat()
                .filter(Boolean)
                .map((err)=> err._errors)
                .flat()

            console.log(flatErrors)


            // This is the value shown as result
            return res.status(400).json({
                message: flatErrors.join(', ')
            })


            // const errorMessages= result.error?.errors?.map((err)=>err.message)
            // const error= errorMessages?.join(',')
            // res.status(400).json({
            //     message: error
            // })
        }

        next()
    }
}