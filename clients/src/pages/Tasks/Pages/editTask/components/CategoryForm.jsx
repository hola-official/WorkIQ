// "use client";
// import * as z from "zod";
// // import axios from "axios";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { Pencil } from "lucide-react";
// import React, { useState } from "react";
// // import toast from "react-hot-toast";
// // import { useRouter } from "next/navigation";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormMessage,
// } from "@/components/ui/form";
// import { Button, Select } from "@chakra-ui/react";
// import { cn } from "@/lib/utils";
// import { Combobox } from "@/components/ui/combobox";
// import useShowToast from "../../../../../hooks/useShowToast";
// // import { useGetTasksQuery, useUpdateCategoryMutation } from "@/features/tasks/tasksApiSlice";
// const formSchema = z.object({
//   categoryId: z.string().min(1),
// });
// const CategoryForm = ({ initialData, taskId, options }) => {
//   console.log(options)
//   const showToast = useShowToast();
//   const [isEditing, setIsEditing] = useState(false);
//   const toggleEdit = () => setIsEditing((current) => !current);
//   // const [updateCategory, { isLoading, isError, isSuccess, error }] =
//   // useUpdateCategoryMutation();
//   // const router = useRouter();
//   const form = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       categoryId: initialData?.categoryId || "",
//     },
//   });
//   const { isSubmitting, isValid } = form.formState;
//   const onSubmit = async (values) => {
//     try {
//       await axios.patch(`/tasks/edit-task/${taskId}/category`, values);
//       await updateCategory({ id: taskId, ...values }).unwrap();
//       showToast("Success", "Task updated", "success");
//       toggleEdit();
//       // router.refresh();
//     } catch {
//       showToast("Error", "Something went wrong", "error");
//     }
//   };
//   const selectedOption = options.find(
//     (option) => option.value === initialData.categoryId
//   );
//   return (
//     <div className="relative mt-6 border bg-slate-100 rounded-md p-4">
//       <div className="font-medium flex items-center justify-between">
//         Task category
//         <Button onClick={toggleEdit} variant="ghost">
//           {isEditing ? (
//             <>Cancel</>
//           ) : (
//             <>
//               <Pencil className="h-4 w-4 mr-2" />
//               Edit category
//             </>
//           )}
//         </Button>
//       </div>
//       {!isEditing && (
//         <p
//           className={cn(
//             "text-sm mt-2",
//             !initialData.categoryId && "text-slate-500 italic"
//           )}
//         >
//           {selectedOption?.label || "No category"}
//         </p>
//       )}
//       {isEditing && (
//         <Form {...form}>
//           <form
//             onSubmit={form.handleSubmit(onSubmit)}
//             className="space-y-4 mt-4"
//           >
//             <FormField
//               control={form.control}
//               name="categoryId"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormControl>
//                     <Select  options={options} {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <div className="flex items-center gap-x-2">
//               <Button
//                 colorScheme="blue"
//                 disabled={!isValid || isSubmitting}
//                 type="submit"
//               >
//                 Save
//               </Button>
//             </div>
//           </form>
//         </Form>
//       )}
//     </div>
//   );
// };

// export default React.memo(CategoryForm);


import React, { useState } from "react";
import { EditIcon } from "@chakra-ui/icons";
import { FormControl, FormErrorMessage, FormHelperText, Select, Button } from "@chakra-ui/react";
import { Box } from "@chakra-ui/layout";
import useShowToast from "@/hooks/useShowToast";
import { useAxiosInstance } from "../../../../../../api/axios";

const CategoryForm = ({ initialData, taskId, options, setTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);
  const [selectedCategory, setSelectedCategory] = useState(initialData.categoryId);
  const [isLoading, setIsLoading] = useState(false);
  const axiosInstance = useAxiosInstance()
  const showToast = useShowToast()

  const onSubmit = async () => {
    try {
      // setIsLoading(true);
      await axiosInstance.put(`/tasks/edit-task/${taskId}/category`, { categoryId: selectedCategory });
      showToast('Success', "Task updated", 'success')
      toggleEdit();
      setTask((prev) => ({ ...prev, title: values.title }));
    } catch (error) {
      showToast('Error', 'Something went wrong', 'error')
    }
    // finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <div className=" mt-6 border border-solid border-1 border-slate-300 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Category
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <EditIcon className="h-4 w-4 mr-2" />
              Edit category
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <Box mt={2} className={!initialData.categoryId && "italic"}>
          {options.find((option) => option.value === initialData.categoryId)?.label || "No category"}
        </Box>
      )}
      {isEditing && (
        <form onSubmit={onSubmit} className="space-y-4 mt-4">
          <FormControl id="categoryId" isInvalid={!selectedCategory} isRequired>
            <Select
              placeholder="Select category"
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
              isDisabled={isLoading}
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
            <FormErrorMessage>Please select a category</FormErrorMessage>
            <FormHelperText>Choose a category for the task</FormHelperText>
          </FormControl>
          <Button colorScheme="blue" isDisabled={!selectedCategory || isLoading} type="submit">
            Save
          </Button>
        </form>
      )}
    </div>
  );
};

export default React.memo(CategoryForm);
