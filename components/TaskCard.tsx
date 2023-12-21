import { deleteTask, setTaskToDone } from '@/actions/task'
import { cn } from '@/lib/utils'
import { Task } from '@prisma/client'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import React, { useTransition } from 'react'
import { Checkbox } from './ui/checkbox'
import { Skeleton } from './ui/skeleton'
import { Button } from './ui/button'
import { TrashIcon } from '@radix-ui/react-icons'
import { toast } from './ui/use-toast'

type Props = {
    task:Task
}

const TaskCard = ({task}: Props) => {
    const [isLoading, startTransition] = useTransition();
  const router = useRouter();

  const submitDelete= async()=>{
      try {
          await deleteTask(task.id)
          router.refresh();
          toast({
            title: "Success",
            description: "Task deleted successfully",
          });
        } catch (error) {
          toast({
            title: "Error",
            description: "Cannot delete Task",
            variant: "destructive",
          });
        }
  }
    function getExpirationColor(expiresAt: Date) {
        const days = Math.floor(expiresAt.getTime() - Date.now()) / 1000 / 60 / 60;
      
        if (days < 0) return "text-gray-300 dark:text-gray-400";
      
        if (days <= 3 * 24) return "text-red-500 dark:text-red-400";
        if (days <= 7 * 24) return "text-orange-500 dark:text-orange-400";
        return "text-gree-500 dark:text-green-400";
      }
  return (
    <>
        {isLoading ? (
            <div className='flex flex-col gap-1 w-full'>
             <Skeleton className="w-full h-[10px]" />
             <Skeleton className="w-full h-[10px]" />
            </div>
        ):(
            <div className="flex gap-2 items-center justify-between">
                <div className="flex gap-2 items-start">

                <Checkbox
                  id={task.id.toString()}
                  className="w-5 h-5"
                  checked={task.done}
                  disabled={task.done || isLoading}
                  onCheckedChange={() => {
                    startTransition(async () => {
                      await setTaskToDone(task.id);
                      router.refresh();
                    });
                  }}
                />
                <label
                  htmlFor={task.id.toString()}
                  className={cn(
                    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 decoration-1 dark:decoration-white",
                    task.done && "line-through"
                  )}
                >
                  {task.content}
                  {task.expiresAt && (
                    <p
                      className={cn(
                        "text-xs text-neutral-500 dark:text-neutral-400",
                        getExpirationColor(task.expiresAt)
                      )}
                    >
                      {format(task.expiresAt, "dd/MM/yyyy")}
                    </p>
                  )}
                </label>
                </div>
                <Button size={"icon"} variant={"ghost"} disabled={isLoading}
                onClick={() => {
                    startTransition(submitDelete);
                  }}
                >
                      <TrashIcon />
                </Button>
            </div>
       
        )}
    
  </>
);
  
}

export default TaskCard