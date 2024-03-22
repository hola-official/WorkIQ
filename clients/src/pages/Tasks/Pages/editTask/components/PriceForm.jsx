"use client";
import * as z from "zod";
// import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormMessage, } from "@/components/ui/form";
import { Button } from "@chakra-ui/react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/format";
// import { useUpdateTaskMutation } from "@/features/tasks/tasksApiSlice";
import useShowToast from "../../../../../hooks/useShowToast";
;
const formSchema = z.object({
  price: z.coerce.number(),
});
export const PriceForm = ({ initialData, taskId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const showToast = useShowToast()
  const toggleEdit = () => setIsEditing((current) => !current);
  // const [updateTask, { isLoading, isError, isSuccess, error }] =
  // useUpdateTaskMutation();
  // const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: initialData?.price || undefined,
    },
  });
  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values) => {
    // try {
    //     console.log(values)
    //     await updateTask({ id: taskId, ...values }).unwrap();
    //     showToast('Success', 'Task updated', 'success')
    //     toggleEdit();
    //     // router.refresh();
    // }
    // catch {
    //   showToast('Error', 'Something went wrong', 'error')
    // }
  };
  return (<div className="mt-6 border border-solid shadow-md border-1 border-blue-300 rounded-md p-4">
    <div className="font-medium flex items-center justify-between">
      Task price
      <Button onClick={toggleEdit} variant="ghost">
        {isEditing ? (<>Cancel</>) : (<>
          <Pencil className="h-4 w-4 mr-2" />
          Edit price
        </>)}
      </Button>
    </div>
    {!isEditing && (<p className={cn("text-sm mt-2", !initialData.price && "text-slate-500 italic")}>
      {initialData.price
        ? formatPrice(initialData.price)
        : "Free"}
    </p>)}
    {isEditing && (<Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
        <FormField control={form.control} name="price" render={({ field }) => (<FormItem>
          <FormControl>
            <Input type="number" step="0.01" disabled={isSubmitting} placeholder="Set a price for your task" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>)} />
        <div className="text-xs text-muted-foreground mt-4">
          To make this task free, kindly set price as <strong>0</strong>
        </div>
        <div className="flex items-center gap-x-2">
          <Button colorScheme="blue" disabled={!isValid || isSubmitting} type="submit">
            Save
          </Button>
        </div>
      </form>
    </Form>)}
  </div>);
};
