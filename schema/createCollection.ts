import { CollectionColors } from "@/lib/constant"
import {z} from "zod"

export const createCollectionSchema=z.object({
    name:z.string().min(4,{
        message:"collection name must be require"
    }),
    color:z.string().refine(color=>Object.keys(CollectionColors).includes(color))
})

export type createCollectionSchemaType = z.infer<typeof createCollectionSchema>;