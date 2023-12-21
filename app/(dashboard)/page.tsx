import { wait } from "@/lib/wait"
import { currentUser } from "@clerk/nextjs"
import prisma from "@/lib/prisma"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import SadFace from "@/components/icon/SadFace"
import { Suspense } from "react"
import CreateCollectionBtn from "@/components/CreateCollectionBtn"
import CollectionCard from "@/components/CollectionCard"
import { Skeleton } from "@/components/ui/skeleton"
export default async function Home() {
  const user=  await currentUser()
  await wait(1000)
  if(!user)return <p>error</p>
  return (
    <Suspense fallback={
    <div className="flex flex-col gap-1">
      <Skeleton className="w-[50%] h-[40px]"/>
      <Skeleton className="w-full h-[40px]"/>
      
    </div>
  }
    >
       <h1 className="text-4xl font-bold mb-3">
        Welcome, <br /> {user.firstName} {user.lastName}
      </h1>
      <CollectionList/>
    </Suspense>
  )
}

async function CollectionList(){
  const user=await currentUser();
  const collection= await prisma.collection.findMany(
    {
      include: {
        tasks: true,
      },
      where:{
        userId:user?.id
      }
    }
  )
  if (collection.length === 0) {
    return (
      <div className="flex flex-col gap-5">
        <Alert>
          <SadFace />
          <AlertTitle>There are no collections yet!</AlertTitle>
          <AlertDescription>
            Create a collection to get started
          </AlertDescription>
        </Alert>
        <CreateCollectionBtn />
      </div>
    );
  }
  return (
    <>
       <CreateCollectionBtn />
    <div className="flex flex-col gap-5 mt-6">
       {collection.map((col) => (
          <CollectionCard key={col.id} collection={col} />
        ))}
    </div>
    </>
    
  )
}
