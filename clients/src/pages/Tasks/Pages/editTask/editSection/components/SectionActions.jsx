"use client";
import { Trash } from "lucide-react";
import { useState } from "react";
// import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/ui/confirm-modal";
// import { getStorage, ref, listAll, deleteObject } from "firebase/storage";
// import app from "../../../../../../firebase";
// import {
// 	useDeleteSectionMutation,
// 	useToggleSectionPublishMutation,
// } from "@/features/tasks/tasksApiSlice";
import { useNavigate } from "react-router-dom";
import useShowToast from "../../../../../../hooks/useShowToast";
import { useAxiosInstance } from "../../../../../../../api/axios";

export const SectionActions = ({
	disabled,
	taskId,
	sectionId,
	isPublished,
}) => {
	const [isLoading, setIsLoading] = useState(false);
	const showToast = useShowToast();
	const axiosInstance = useAxiosInstance();
	// const [deleteSection] = useDeleteSectionMutation(); // Ensure you have the appropriate mutation hook
	// const [toggleSectionPublish] = useToggleSectionPublishMutation(); // Ensure you have the appropriate mutation hook
	const navigate = useNavigate();

	const deleteFolderAndContents = async (folderPath) => {
		// const storage = getStorage(app);
		// const folderRef = ref(storage, folderPath);
		// try {
		//     // List all items in the folder
		//     const { items, prefixes } = await listAll(folderRef);
		//     // console.log(items)
		//     // console.log(prefixes)
		//     // Delete items in the folder if any
		//     if (items.length > 0) {
		//         await Promise.all(items.map(async (itemRef) => {
		//             // Delete individual file
		//             await deleteObject(itemRef);
		//         }));
		//     }
		//     // Recursively delete subdirectories if any
		//     if (prefixes.length > 0) {
		//         await Promise.all(prefixes.map(async (prefix) => {
		//             await deleteFolderAndContents(prefix._location.path_);
		//         }));
		//     }
		//     console.log('Folder and its contents deleted successfully');
		// } catch (error) {
		//   toast.error('Something went wrong')
		//     console.error('Error deleting folder and its contents:', error);
		// }
	};

	const onClick = async () => {
		console.log(isPublished)
		try {
			setIsLoading(true);
			if (isPublished) {
				await axiosInstance.put(`/tasks/edit-task/${taskId}/section/${sectionId}/toggle-publish`)
				showToast("Success", "Section unpublished", "success");
			} else {
				await axiosInstance.put(`/tasks/edit-task/${taskId}/section/${sectionId}/toggle-publish`)
				showToast("Success", "Section published", "success");
			}
			// navigate(`/clients/edit-task/${taskId}`);
		} catch (error) {
			console.log(error);
			showToast(
				"Error",
				"Something went wrong" ||
				error.response.data.message ||
				error.response.data.error,
				"error"
			);
		} finally {
			setIsLoading(false);
		}
	};
	const onDelete = async () => {
		try {
			setIsLoading(true);
			// const folderPath =
			// 	`Tasks/${taskId}/Sections/${sectionId}`
			// await deleteFolderAndContents(folderPath);
			// await deleteSection({
			// 	taskId: taskId,
			// 	sectionId: sectionId,
			// }).unwrap();
			await axiosInstance.delete(`/tasks/edit-task/${taskId}/section/${sectionId}`)
			showToast('Success', "Section deleted", 'success')
			navigate(`/clients/edit-task/${taskId}`);
		} catch(error) {
			console.log(error);
			showToast(
				"Error",
				"Something went wrong" ||
				error.response.data.message ||
				error.response.data.error,
				"error"
			);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex items-center gap-x-2">
			<Button
				onClick={onClick}
				disabled={disabled || isLoading}
				variant="outline"
				size="sm"
			>
				{isPublished ? "UnList" : "List"}
			</Button>
			<ConfirmModal onConfirm={onDelete}>
				<Button size="sm" disabled={isLoading}>
					<Trash className="h-4 w-4" />
				</Button>
			</ConfirmModal>
		</div>
	);
};
