// "use client";
// import * as z from "zod";
// // import axios from "axios";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { Pencil } from "lucide-react";
// import { useState } from "react";
// // import toast from "react-hot-toast";
// // import { useRouter } from "next/navigation";
// import {
// 	Form,
// 	FormControl,
// 	FormDescription,
// 	FormField,
// 	FormItem,
// } from "@/components/ui/form";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
// import { Checkbox } from "@/components/ui/checkbox";
// // import { useUpdateSectionMutation } from "@/features/tasks/tasksApiSlice";
// const formSchema = z.object({
// 	isFree: z.boolean().default(false),
// });
// export const SectionPriceForm = ({
// 	initialData,
// 	taskId,
// 	sectionId,
// 	taskPrice,
// }) => {
// 	const [isEditing, setIsEditing] = useState(false);
// 	const toggleEdit = () => setIsEditing((current) => !current);
// 	// const [updateSection, { isLoading, isError, isSuccess, error }] =
// 	// useUpdateSectionMutation();
// 	// const router = useRouter();
// 	const form = useForm({
// 		resolver: zodResolver(formSchema),
// 		defaultValues: {
// 			isFree: !!initialData.isFree,
// 		},
// 	});
// 	const { isSubmitting, isValid } = form.formState;
// 	const onSubmit = async (values) => {
// 		// try {
// 		// 	await updateSection({
// 		// 		taskId: taskId,
// 		// 		sectionId: sectionId,
// 		// 		...values,
// 		// 	}).unwrap();

// 		// 	toast.success("Task updated successfully");
// 		// 	toggleEdit();
// 		// 	// router.refresh();
// 		// } catch (error) {
// 		// 	console.log(error);
// 		// 	toast.error("Something went wrong");
// 		// }
// 	};
// 	return (
// 		<div className="mt-6 border bg-slate-100 rounded-md p-4">
// 			<div className="font-medium flex items-center justify-between">
// 				Budget
// 				<Button onClick={toggleEdit} variant="ghost">
// 					{isEditing ? (
// 						<>Cancel</>
// 					) : (
// 						<>
// 							<Pencil className="h-4 w-4 mr-2" />
// 							Edit access
// 						</>
// 					)}
// 				</Button>
// 			</div>
// 			{!isEditing && (
// 				<p
// 					className={cn(
// 						"text-sm mt-2",
// 						!initialData.isFree && "text-slate-500 italic"
// 					)}
// 				>
// 					{initialData.isFree ? (
// 						<>This section is free to access.</>
// 					) : (
// 						<>This section is not free.</>
// 					)}
// 				</p>
// 			)}
// 			{isEditing && (
// 				<Form {...form}>
// 					<form
// 						onSubmit={form.handleSubmit(onSubmit)}
// 						className="space-y-4 mt-4"
// 					>
// 						<FormField
// 							control={form.control}
// 							name="isFree"
// 							render={({ field }) => (
// 								<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
// 									<FormControl>
// 										<Checkbox
// 											checked={field.value}
// 											disabled={taskPrice ? false : true}
// 											onCheckedChange={field.onChange}
// 										/>
// 									</FormControl>
// 									<div className="space-y-1 leading-none">
// 										<FormDescription>
// 											Check this box if you want to make this section free for
// 											preview
// 										</FormDescription>
// 									</div>
// 								</FormItem>
// 							)}
// 						/>
// 						{!taskPrice && (
// 							<div className="text-xs text-muted-foreground mt-4">
// 								Kindly set price for this task to enable the checkbox
// 							</div>
// 						)}
// 						<div className="flex items-center gap-x-2">
// 							<Button disabled={!isValid || isSubmitting} type="submit">
// 								Save
// 							</Button>
// 						</div>
// 					</form>
// 				</Form>
// 			)}
// 		</div>
// 	);
// };

"use client";
import * as z from "zod";
// import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Button,
  Alert,
  AlertIcon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { cn } from "@/lib/utils";
// import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/format";
import useShowToast from "@/hooks/useShowToast";
import { useAxiosInstance } from "../../../../../../../api/axios";

const formSchema = z.object({
  price: z.coerce.number(),
});
export const SectionPriceForm = ({
  initialData,
  taskId,
  setTask,
  sectionId,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [priceError, setPriceError] = useState("");
  const [price, setPrice] = useState("");
  const showToast = useShowToast();
  const axiosInstance = useAxiosInstance();
  const toggleEdit = () => setIsEditing((current) => !current);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: initialData?.price || undefined,
    },
  });
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values) => {
    console.log(values);
    const price = parseFloat(values.price);
    if (price < 5) {
      return setPriceError("Price must be at least $5");
      // console.log(price);
      // console.log(priceError);
    }
    try {
      await axiosInstance.put(
        `/tasks/edit-task/${taskId}/section/${sectionId}`,
        values
      );
      showToast("Success", "Task updated successfully", "success");
      toggleEdit();
      setTask((prev) => ({ ...prev, price: values.price }));
      // router.refresh();
    } catch (error) {
      console.log('price error goes here',error);
      showToast(
        "Error",
        error.response.data.message || error.response.data.error,
        "error"
      );
    }
  };

  useEffect(() => {
    if (!isEditing) {
      setPriceError("");
    }
  }, [isEditing]);

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Task price
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit price
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <div>
          <p
            className={cn(
              "text-sm mt-2",
              !initialData.price && "text-slate-500 italic"
            )}
          >
            {initialData.price ? formatPrice(initialData.price) : "Free"}
          </p>
          <div className="text-xs text-muted-foreground mt-4">
            You can adjust the price as per your budget.
          </div>
        </div>
      )}

      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        // color='gray.300'
                        fontSize="1.2em"
                      >
                        $
                      </InputLeftElement>
                      {/* <Input placeholder='Enter amount' /> */}
                      <Input
                        colorScheme={"blue"}
                        type="number"
                        // step="0.01"
                        isDisabled={isSubmitting}
                        // min={5} // Minimum price of $5
                        placeholder="Set a price for your task"
                        // onChange={handlePriceChange}
                        {...field}
                      />
                      {Number(form.getValues().price) >= 5 && (
                        <InputRightElement>
                          <CheckIcon color="blue.500" />
                        </InputRightElement>
                      )}
                    </InputGroup>
                  </FormControl>
                  {/* {priceError && (
						<FormMessage className="text-red-500">{priceError}</FormMessage>
					)} */}
                  {priceError && (
                    <Alert status="error" borderRadius="md">
                      <AlertIcon />
                      {priceError}
                    </Alert>
                  )}
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button
                colorScheme="blue"
                isDisabled={!isValid || isSubmitting}
                type="submit"
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
